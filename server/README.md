# Server

Endpoints are mounted under the /api/v1 base path.

Available endpoints:
- GET /api/v1/skills — returns skill set documents from the configured MongoDB collection (env: ITEMS_COLLECTION)
 - GET /api/v1/skills — returns skill set documents from the configured MongoDB collection (env: ITEMS_COLLECTION)
 - POST /api/v1/contact — accepts contact form submissions and sends an email to the site owner (requires SMTP env variables configured)

Logging:
- Request logging: morgan in 'dev' mode
- Controller/service: console.log/console.error for query and result counts

Run locally:

```bash
# from server/ directory
npm install
npm run dev   # requires nodemon
# or
npm start
```

Environment variables (see .env):
- MONGO_URI — MongoDB connection URI
- MONGO_DB_NAME — database name
- ITEMS_COLLECTION — collection name for skills (default: skillSet)
- PORT — server port (default: 5000)

Contact form / Email
- SMTP_HOST — SMTP server host (e.g. smtp.sendgrid.net)
- SMTP_PORT — SMTP port (default: 587)
- SMTP_USER — SMTP username
- SMTP_PASS — SMTP password
- MAIL_FROM — Sender address used in From header (defaults to SMTP_USER)
- MAIL_TO — Recipient address where contact emails will be sent (defaults to MAIL_FROM)
- CONTACT_MAX_PER_HOUR — optional rate limit for contact submissions per IP (default: 5)

SMTP / Gmail troubleshooting
----------------------------

If you see authentication errors from the contact endpoint (for example: "535-5.7.8 Username and Password not accepted" or EAUTH), try the following:

- Verify your environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` are set and correct.
- If you're using a Gmail account as the SMTP provider, Google requires either:
	- Use an App Password (recommended): enable 2-Step Verification for the account, then create an App Password and use that value for `SMTP_PASS`. See: https://support.google.com/mail/?p=BadCredentials
	- (Not recommended) Less secure app access used to be an option but has been removed for most accounts. App Passwords are the supported path.
- Ensure `MAIL_FROM`/`MAIL_TO` are correct. Use `MAIL_FROM` that matches or is allowed by your SMTP provider to avoid SPF/DKIM/rejection.
- Check that the account isn't blocking sign-in from new locations/devices — review security alerts in the account and allow access if necessary.

Example env (for Gmail + App Password):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=<your-app-password>
MAIL_FROM=your-email@gmail.com
MAIL_TO=your-email@gmail.com
```

If problems persist, review the server logs (they now include a verification step) for EAUTH messages and Google support links that indicate why the credentials were rejected.

Using visitor email as From address (not recommended)
--------------------------------------------------

The server now supports an optional flag `CONTACT_USE_VISITOR_AS_FROM`. When set to `true`, the server will use the visitor-supplied email address as the outgoing message's From address and will send the message TO the address configured in `MAIL_TO` (or `SMTP_USER` if `MAIL_TO` is not set).

Warning: enabling this will likely cause delivery issues because most SMTP providers (Gmail, SendGrid, etc.) require the envelope/sender to match the authenticated account or the sending domain's SPF/DKIM records. Use this flag only if you understand the implications and have control over the sending domain's DNS/SPF/DKIM settings.

Example:

```env
CONTACT_USE_VISITOR_AS_FROM=true
MAIL_TO=owner@example.com
```

Recommended default: leave `CONTACT_USE_VISITOR_AS_FROM` disabled (or unset), keep `MAIL_FROM`/`SMTP_USER` as the authenticated sender, and rely on `replyTo` to route replies to visitors.
