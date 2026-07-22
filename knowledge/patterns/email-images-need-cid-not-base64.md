# Embedded email images: use CID attachments, not base64 data URIs

Observed 2026-07-22 building the contact-form auto-reply: the logo was embedded as a
`data:image/png;base64,...` URI in the `<img src>`. It rendered perfectly in a browser
preview (screenshot via headless Chrome) but did not show up at all in Gmail.

**Why:** Gmail strips `data:` URI images from third-party HTML email as an anti-spam
measure. This is long-standing, well-known behavior in email developer circles, but easy to
miss if you only preview the HTML in a browser — a browser has no reason to strip it, so a
browser-rendered preview gives false confidence.

**How to apply:** for any image embedded in a transactional/marketing email (not a web page),
use a CID inline attachment instead: pass the image as an `attachments` entry with a
`contentId` (Resend's SDK supports this directly — `{ filename, content, contentId }`), then
reference it in the HTML as `<img src="cid:theContentId">`. This is supported broadly across
Gmail, Outlook, Apple Mail, etc. Never trust a browser screenshot alone to validate email
image rendering — cross-check in the actual target client (Gmail here) before calling it done.
