import Head from "next/head";
import "../styles/globals.css";

export default function App({Component,pageProps}){
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Baruch-Ermi — Foreclosure & Auction Solutions</title>
        <meta name="description" content="Nationwide foreclosure & auction solutions. Clear options, fast action, and simple communication." />
        <meta property="og:title" content="Baruch-Ermi" />
        <meta property="og:description" content="Clear options, fast action. Talk to a real person today." />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
