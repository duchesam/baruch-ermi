import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
export default function Layout({title,description,path='/',children,privatePage=false}){return <><Head><title>{title} | Baruch-Ermi LLC</title><meta name="description" content={description||'Thoughtful property solutions and real estate investment relationships in Tampa Bay.'}/><link rel="canonical" href={'https://baruch-ermi.org'+path}/>{privatePage&&<meta name="robots" content="noindex,nofollow"/>}</Head><Header/><main id="main-content">{children}</main><Footer/></>;}
