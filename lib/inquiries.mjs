import {createHash} from 'node:crypto';
const trim=(v,n=500)=>typeof v==='string'?v.trim().slice(0,n):'';
export function validateInquiry(input){
 const kind=input?.kind;if(!['seller','investor','agent','general','automation'].includes(kind))throw Object.assign(new Error('Select an inquiry type.'),{status:400});
 const data={name:trim(input.name,120),email:trim(input.email,254).toLowerCase(),phone:trim(input.phone,40),address:trim(input.address,300),city:trim(input.city,100),brokerage:trim(input.brokerage,150),message:trim(input.message,4000),condition:trim(input.condition,80),askingPrice:trim(input.askingPrice,40),mortgageBalance:trim(input.mortgageBalance,40),monthlyPayment:trim(input.monthlyPayment,40),occupancy:trim(input.occupancy,80),situation:trim(input.situation,100)};
 if(kind==='automation'){
  const systems=['lead-desk','creative-financing','seller-inquiry','not-sure'];
  const models=['implementation','managed','undecided'];
  if(!systems.includes(input.requestedSystem)||!models.includes(input.deliveryPreference))throw Object.assign(new Error('Choose a valid system and delivery preference.'),{status:400});
  data.requestedSystem=input.requestedSystem;data.deliveryPreference=input.deliveryPreference;
 }
 if(!data.name||!/^\S+@\S+\.\S+$/.test(data.email)||(kind==='seller'||kind==='agent')&&!data.address||kind==='agent'&&!data.brokerage)throw Object.assign(new Error('Complete the required name, email, and property or brokerage fields.'),{status:400});
 if(input.website||!Number.isFinite(input.startedAt)||Date.now()-input.startedAt<2000||Date.now()-input.startedAt>86400000)throw Object.assign(new Error('Please refresh the form and try again.'),{status:400});
 if((input.smsConsent===true||input.marketingConsent===true)&&!data.phone)throw Object.assign(new Error('Provide a phone number for text consent, or leave text consent unchecked.'),{status:400});
 data.consent={inquiryResponse:true,sms:input.smsConsent===true,marketingSms:input.marketingConsent===true,version:'2026-11-03',recordedAt:new Date().toISOString()};
 data.source='https://baruch-ermi.org/'+({seller:'sell-your-property',investor:'investors',agent:'agent-partners',general:'contact',automation:'automations'}[kind]);
 if(kind==='automation'&&data.requestedSystem!=='not-sure')data.source+='/'+data.requestedSystem;
 return {kind,data};
}
export function fingerprint(kind,data){return createHash('sha256').update(JSON.stringify([kind,data.name,data.email,data.address,data.message,data.phone,data.consent.sms,data.consent.marketingSms,data.requestedSystem||'',data.deliveryPreference||'',new Date().toISOString().slice(0,10)])).digest('hex');}
