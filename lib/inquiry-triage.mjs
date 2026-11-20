// Advisory only: deterministic intake completeness, not property valuation or seller motivation.
export function triageInquiry(inquiry){
 const d=inquiry?.data||{};
 if(inquiry?.kind!=='seller')return {priority:'Standard',reason:'Non-seller inquiry; route to the appropriate team.',next:'Review the request and respond.'};
 const address=typeof d.address==='string'&&d.address.trim().length>0;
 const details=typeof d.message==='string'&&d.message.trim().length>=30;
 const contact=Boolean((typeof d.email==='string'&&d.email.trim())||(typeof d.phone==='string'&&d.phone.trim()));
 if(address&&details&&contact)return {priority:'Review first',reason:'Seller provided a property address, detailed message, and contact information.',next:'Verify property details and contact the seller.'};
 return {priority:'Needs details',reason:'Seller intake is missing an address, detailed message, or contact information.',next:'Request missing information before underwriting.'};
}
