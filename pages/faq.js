import Head from 'next/head';
import Layout from '../components/Layout';

const questions = [
  ['Where does Baruch-Ermi LLC focus?', 'Tampa Bay and surrounding markets, including Riverview, Wimauma, Brandon, Tampa, and Wesley Chapel.'],
  ['Can I submit a property that needs repairs?', 'Yes. Share its condition and the information you have. A review does not require renovating first.'],
  ['Can investors and real estate agents connect with you?', 'Yes. Use the investor or agent inquiry page to introduce your goals or submit an opportunity.'],
  ['Are website calculator results verified valuations?', 'No. They are scenario estimates based on inputs and assumptions. Confirm property values, financing, and expenses independently.'],
  ['Am I committed after submitting a form?', 'No. Any transaction requires separate review and agreed written terms.']
];
const faqSchema = {
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:questions.map(([name,text])=>({
    '@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}
  }))
};
export default function FAQ(){return <Layout title="Frequently Asked Questions" description="Answers to common questions about selling a property as-is, working with investors and agents, and real estate options in Tampa Bay." path="/faq">
  <Head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/></Head>
  <section className="page-intro"><div className="wrap"><span className="eyebrow">HELPFUL STARTING POINTS</span><h1>A little more <em>clarity.</em></h1></div></section>
  <section className="section"><div className="wrap faq-list">{questions.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
</Layout>;}
