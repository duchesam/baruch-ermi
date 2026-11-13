export const SOURCE='https://gisdextweb1.hillsboroughcounty.org/arcgis/rest/services/Accela_GIS/MapServer/1';
export function queryParams(url){
 const city=url.searchParams.get('city'),q=(url.searchParams.get('q')||'').trim(),kind=url.searchParams.get('kind')||'all';
 if(!['Riverview','Brandon','Tampa','Temple Terrace'].includes(city)||!['all','land'].includes(kind)||q.length<3||q.length>80||!/^[a-zA-Z0-9 .#-]+$/.test(q))throw Error('Choose a supported city and enter 3–80 letters, numbers, spaces, or address punctuation.');
 const where=`UPPER(SITE_CITY) = '${city.toUpperCase()}' AND (UPPER(SITE_ADDR) LIKE '%${q.toUpperCase()}%' OR Acc_Folio = '${q}')`+(kind==='land'?' AND BLDG = 0':'');
 return new URLSearchParams({f:'json',where,outFields:'Acc_Folio,OWNER,SITE_ADDR,SITE_CITY,SITE_ZIP,ADDR_1,ADDR_2,CITY,STATE,ZIP,BLDG,LAND',returnGeometry:'false',resultRecordCount:'100',orderByFields:'OBJECTID ASC'});
}
const clean=v=>v===null||v===undefined?'':String(v);
const NAME=/^[a-zA-Z0-9 .,'&-]+$/;
const fields='Acc_Folio,OWNER,SITE_ADDR,SITE_CITY,SITE_ZIP,ADDR_1,ADDR_2,CITY,STATE,ZIP,BLDG,LAND';
function rowsFrom(data,retrievedAt){return data.features.slice(0,100).map(({attributes:a})=>{if(!a||!a.Acc_Folio)throw Error('County returned an incomplete parcel record.');return {parcelid:clean(a.Acc_Folio),address:clean(a.SITE_ADDR),city:clean(a.SITE_CITY),zip:clean(a.SITE_ZIP),owner:clean(a.OWNER),mailingaddress:[a.ADDR_1,a.ADDR_2,a.CITY,a.STATE,a.ZIP].filter(Boolean).join(', '),source:'Hillsborough County public parcel GIS',sourceurl:SOURCE,notes:`County parcel feed retrieved ${retrievedAt}. Recorded building value: ${clean(a.BLDG)||'unknown'}; land value: ${clean(a.LAND)||'unknown'}. Zero building value does not independently verify vacancy. No probate, tax delinquency, or code violation signal inferred.`};});}
async function countyQuery(params,fetcher){const response=await fetcher(SOURCE+'/query?'+params,{signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('County source returned HTTP '+response.status);const data=await response.json();if(data.error||!Array.isArray(data.features))throw Error('County source could not complete this query. Please try again later.');const retrievedAt=new Date().toISOString();return {rows:rowsFrom(data,retrievedAt),retrievedAt,more:data.exceededTransferLimit===true,source:SOURCE};}
export async function collect(url,fetcher=fetch){
 return countyQuery(queryParams(url),fetcher);
}

export async function collectByOwner(name,fetcher=fetch){const value=clean(name).trim();if(value.length<5||value.length>100||!NAME.test(value))throw Object.assign(new Error('A valid estate name is required for county matching.'),{status:400});const words=value.toUpperCase().replace(/[^A-Z0-9 ]/g,' ').split(/\s+/).filter(word=>word.length>1);if(words.length<2)throw Object.assign(new Error('At least a first and last name are required.'),{status:400});const first=words[0].replaceAll("'","''"),last=words.at(-1).replaceAll("'","''");const params=new URLSearchParams({f:'json',where:`UPPER(OWNER) LIKE '%${first}%' AND UPPER(OWNER) LIKE '%${last}%'`,outFields:fields,returnGeometry:'false',resultRecordCount:'100',orderByFields:'OBJECTID ASC'});return countyQuery(params,fetcher);}

export async function collectByFolio(folio,fetcher=fetch){const value=clean(folio).trim();if(!/^\d{1,11}$/.test(value))throw Object.assign(new Error('Invalid county folio.'),{status:400});const params=new URLSearchParams({f:'json',where:`Acc_Folio = '${value}'`,outFields:fields,returnGeometry:'false',resultRecordCount:'2'});return countyQuery(params,fetcher);}
