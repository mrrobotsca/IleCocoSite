import { GOOGLE_TAG_ID } from '@/lib/analytics/google-ads'
import { CONSENT_COOKIE, consentState } from '@/lib/analytics/consent'

// Consent defaults must reach the dataLayer before `config`, and a returning
// visitor's saved choice must be applied before the first hit — so both happen
// here, inline, ahead of the standard gtag.js snippet.
const inlineScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', ${JSON.stringify(consentState('denied'))});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
if (/(?:^|; )${CONSENT_COOKIE}=granted/.test(document.cookie)) {
  gtag('consent', 'update', ${JSON.stringify(consentState('granted'))});
}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');
`

/** Google tag (gtag.js) with Consent Mode v2. Render inside <head>. */
export const GoogleTag = () => (
  <>
    <script id='google-tag-init' dangerouslySetInnerHTML={{ __html: inlineScript }} />
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} />
  </>
)
