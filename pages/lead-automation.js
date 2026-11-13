import Head from 'next/head';
import WorkspaceNav from '../components/WorkspaceNav';
import LeadAutomationWorkspace from '../components/LeadAutomationWorkspace';
import {protectPage} from '../lib/auth.mjs';
export const getServerSideProps=protectPage;
export default function LeadAutomation(){return <><Head><title>Probate Automation | Baruch-Ermi</title><meta name="robots" content="noindex,nofollow"/></Head><WorkspaceNav/><main className="wrap lead-auto-page"><LeadAutomationWorkspace/></main></>}
