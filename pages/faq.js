import Layout from '../components/Layout';
import {faqSchema} from '../lib/seo';

const description='Answers about Baruch-Ermi property reviews, as-is homes, inherited properties, investors, real estate agents, purchase structures, and website tools.';
const faqs=[
  ['Where does Baruch-Ermi focus?','Tampa Bay and surrounding markets, including Riverview, Wimauma, Brandon, Tampa, and Wesley Chapel. Each opportunity is reviewed individually.'],
  ['Can I submit a property that needs repairs?','Yes. Share its current condition and the information you have. You do not have to renovate before requesting an initial property review.'],
  ['What happens after I submit a property?', 'The submission is recorded for review. Baruch-Ermi may contact you to clarify ownership, condition, timing, title, financing, occupancy, or other property details. A submission does not guarantee an offer.'],
  ['Can investors and real estate agents connect with you?','Yes. Use the investor or agent inquiry page to introduce your criteria, discuss a possible relationship, or submit an opportunity.'],
  ['Are website calculator results verified valuations?','No. They are scenario estimates based on inputs and assumptions. Confirm property values, financing, repairs, income, and expenses independently.'],
  ['What is seller financing?','Seller financing generally means the seller agrees to receive some or all of the purchase price over time under negotiated documents. Interest, security, servicing, default, tax, and balloon-payment issues require careful review.'],
  ['What is a Subject-To purchase?','It generally means acquiring title while an existing loan remains in place. It is not the same as a formal loan assumption, may leave the original borrower liable, and can involve due-on-sale and other material risks. Obtain independent professional advice.'],
  ['Am I committed after submitting a form?','No. An inquiry starts a conversation. Any transaction requires separate due diligence and mutually agreed written terms.'],
];

export default function FAQ(){return <Layout title="Frequently Asked Questions" description={description} path="/faq" schemas={[faqSchema(faqs)]}><section className="page-intro"><div className="wrap"><span className="eyebrow">HELPFUL STARTING POINTS</span><h1>A little more <em>clarity.</em></h1><p>Quick answers about property reviews, possible purchase structures, business relationships, and the limits of website tools.</p></div></section><section className="section"><div className="wrap faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section></Layout>;}
