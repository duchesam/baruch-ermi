export function missingPropertyInquiries(inquiries,records){
 const linked=new Set(records.filter(r=>r.inquiryId).map(r=>r.inquiryId));
 const recordIds=new Set(records.map(r=>r.id));
 return inquiries.filter(i=>i.data?.address&&!linked.has(i.id)&&!recordIds.has('inquiry:'+i.id));
}
