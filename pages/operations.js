import Head from 'next/head';
import WorkspaceNav from '../components/WorkspaceNav';
import OperationsWorkspace from '../components/OperationsWorkspace';
import {protectPage} from '../lib/auth.mjs';
export const getServerSideProps=protectPage;
export default function Operations(){return <><Head><title>Operations | Baruch-Ermi</title><meta name="robots" content="noindex,nofollow"/></Head><WorkspaceNav/><main className="wrap ops-page"><OperationsWorkspace/></main></>;}
