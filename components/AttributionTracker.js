import { useEffect } from 'react';

const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const clean = value => String(value || '').trim().slice(0, 160);

export default function AttributionTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('be-attribution')) return;
      const params = new URLSearchParams(window.location.search);
      const attribution = {
        landingPath: clean(window.location.pathname),
        referrerHost: '',
      };
      campaignKeys.forEach(key => {
        const value = clean(params.get(key));
        if (value) attribution[key] = value;
      });
      if (document.referrer) {
        const referrer = new URL(document.referrer);
        if (referrer.hostname !== window.location.hostname) attribution.referrerHost = clean(referrer.hostname);
      }
      sessionStorage.setItem('be-attribution', JSON.stringify(attribution));
    } catch {
      // Attribution is optional. Browsers that block session storage continue normally.
    }
  }, []);
  return null;
}
