export const SOURCE='https://gisdextweb1.hillsboroughcounty.org/arcgis/rest/services/Accela_GIS/MapServer/1';
export function queryParams(url){
 const city=url.searchParams.get('city'),q=(url.searchParams.get('q')||'').trim(),kind=url.searchParams.get('kind')||'all';
 if(!['Riverview','Brandon','Tampa','Temple Terrace'].includes(city)||!['all','land'].includes(kind)||q.length<3||q.length>80||!/^[a-zA-Z0-9 .#-]+$/.test(q))throw Error('Choose a supported city and enter 3–80 letters, numbers, spaces, or address punctuation.');
 const where=`UPPER(SITE_CITY) = '${city.toUpperCase()}' AND (UPPER(SITE_ADDR) LIKE '%${q.toUpperCase()}%' OR Acc_Folio = '${q}')`+(kind==='land'?' AND BLDG = 0':'');
 return new URLSearchParams({f:'json',where,outFields:'Acc_Folio,OWNER,SITE_ADDR,SITE_CITY,SITE_ZIP,ADDR_1,ADDR_2,CITY,STATE,ZIP,BLDG,LAND',returnGeometry:'false',resultRecordCount:'100',orderByFields:'OBJECTID ASC'});
}
const clean=v=>v===null||v===undefined?'':String(v);
export async function collect(url,fetcher=fetch){
 const params=queryParams(url),response=await fetcher(SOURCE+'/query?'+params,{signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error('County source returned HTTP '+response.status);
 const data=await response.json();if(data.error||!Array.isArray(data.features))throw Error('County source could not complete this query. Please try again later.');
 const retrievedAt=new Date().toISOString();
 const rows=data.features.slice(0,100).map(({attributes:a})=>{if(!a||!a.Acc_Folio)throw Error('County returned an incomplete parcel record.');return {parcelid:clean(a.Acc_Folio),address:clean(a.SITE_ADDR),city:clean(a.SITE_CITY),zip:clean(a.SITE_ZIP),owner:clean(a.OWNER),mailingaddress:[a.ADDR_1,a.ADDR_2,a.CITY,a.STATE,a.ZIP].filter(Boolean).join(', '),source:'Hillsborough County public parcel GIS',sourceurl:SOURCE,notes:`County parcel feed retrieved ${retrievedAt}. Recorded building value: ${clean(a.BLDG)||'unknown'}; land value: ${clean(a.LAND)||'unknown'}. Zero building value does not independently verify vacancy. No probate, tax delinquency, or code violation signal inferred.`};});
 return {rows,retrievedAt,more:data.exceededTransferLimit===true,source:SOURCE};
}
