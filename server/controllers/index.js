const services = require('../services');
const nodemailer = require('nodemailer');

// Simple in-memory rate limiter per IP to avoid spam (server restart clears it)
const submissions = {}; // { ip: { count, first } }

// helper: sanitize header-like values to avoid CRLF injection and overly long values
function sanitizeHeaderValue(value, maxLen = 256) {
    if (!value || typeof value !== 'string') return '';
    // remove CR and LF characters and trim
    const cleaned = value.replace(/[\r\n]/g, ' ').trim();
    return cleaned.length > maxLen ? cleaned.slice(0, maxLen) : cleaned;
}


async function getSkillSet(req, res) {
    try {
        console.log(`Entering getSkillSet controller`);
        const query = { ...req.query };
        const result = await services.getSkillSets(query);
        console.log(`Successfully returned Skills data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getSkillSet controller:', err);
        res.status(500).json({ error: err.message });
    }
}

async function getExperience(req, res) {
    try {
        console.log(`Entering getExperience controller`);
        const query = { ...req.query };
        const result = await services.getExperiences(query);
        console.log(`Successfully returned Experience data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getExperience controller:', err);
        res.status(500).json({ error: err.message });
    }
}

async function getContactInfo(req, res) {
    try {
        console.log(`Entering getContactInfo controller`);
        const query = { ...req.query };
        const result = await services.getContactInfo(query);
        console.log(`Successfully returned Contact Info data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getContactInfo controller:', err);
        res.status(500).json({ error: err.message });
    }
}

async function getAboutMe(req, res) {
    try {
        console.log(`Entering getAboutMe controller`);
        const query = { ...req.query };
        const result = await services.getAboutMe(query);
        console.log(`Successfully returned About Me data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getAboutMe controller:', err);
        res.status(500).json({ error: err.message });
    }
}

async function getProjects(req, res) {
    try {
        console.log(`Entering getProjects controller`);
        const query = { ...req.query };
        const result = await services.getProjects(query);
        console.log(`Successfully returned Projects data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getProjects controller:', err);
        res.status(500).json({ error: err.message });
    }
}

// POST /contact - accept contact form submissions and send email
async function sendContact(req, res) {
    try {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const now = Date.now();

        // basic rate limit: max 5 submissions per IP per hour
        const windowMs = 60 * 60 * 1000; // 1 hour
        const maxPerWindow = parseInt(process.env.CONTACT_MAX_PER_HOUR, 20) || 5;

        if (!submissions[ip]) submissions[ip] = { count: 0, first: now };
        const record = submissions[ip];
        if (now - record.first > windowMs) {
            // reset window
            record.count = 0;
            record.first = now;
        }
        if (record.count >= maxPerWindow) {
            return res.status(429).json({ error: 'Too many submissions from this IP. Please try again later.' });
        }

        const { name: rawName, email: rawEmail, subject: rawSubject, message } = req.body || {};

        // sanitize header-like inputs
        const name = sanitizeHeaderValue(rawName, 128);
        const email = sanitizeHeaderValue(rawEmail, 256);
        const subject = sanitizeHeaderValue(rawSubject, 256);

        // minimal validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields: name, email, subject, message' });
        }

        // validate email format (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // limit message size to avoid abuse
        const maxMessageLength = parseInt(process.env.CONTACT_MAX_MESSAGE_LENGTH || '5000', 10);
        if (message.length > maxMessageLength) {
            return res.status(400).json({ error: `Message too long (max ${maxMessageLength} characters)` });
        }

        // Prepare transporter
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 587;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        // Feature flag: when true, use the visitor's email as the From address (may be rejected by some SMTP providers)
        const useVisitorAsFrom = String(process.env.CONTACT_USE_VISITOR_AS_FROM || '').toLowerCase() === 'true';
        const mailTo = process.env.MAIL_TO || smtpUser;
        // mailFrom will either be visitor email (if feature enabled) or the configured MAIL_FROM/smtpUser
        const mailFromEnv = process.env.MAIL_FROM || smtpUser;
        const mailFrom = useVisitorAsFrom ? email : mailFromEnv;

        if (!smtpHost || !smtpUser || !smtpPass) {
            console.error('SMTP configuration missing. Cannot send email.');
            return res.status(500).json({ error: 'Email transport is not configured on the server.' });
        }

        if (useVisitorAsFrom) {
            console.warn('CONTACT_USE_VISITOR_AS_FROM is enabled: using visitor-supplied email as the From address. This may cause delivery failures due to SPF/DKIM and provider policies.');
            console.warn('Recommended: disable this flag and use MAIL_FROM that matches your SMTP account, and use replyTo for visitor replies.');
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        // Verify SMTP configuration early so we can produce actionable logs
        try {
            await transporter.verify();
            console.log('SMTP transporter verified successfully');
        } catch (verifyErr) {
            // If authentication failed, nodemailer surfaces EAUTH with Gmail when
            // credentials are rejected. Produce a more helpful log message here.
            console.error('Failed to verify SMTP transporter:', verifyErr && verifyErr.message);
            if (verifyErr && verifyErr.code === 'EAUTH') {
                console.error('SMTP authentication failed (EAUTH). Common causes and next steps:');
                console.error('- Incorrect SMTP_USER or SMTP_PASS environment variables');
                console.error("- If using Gmail, ensure the account has 2-Step Verification enabled and use an App Password (not the account password). See: https://support.google.com/mail/?p=BadCredentials");
                console.error('- Ensure the SMTP_HOST and SMTP_PORT values are correct for your provider');
            }
            return res.status(500).json({ error: 'Email transport authentication failed on the server. Please check server logs for details.' });
        }
        // Use visitor name as the display name in the From header while keeping the
        // authenticated sender address (mailFrom) as the actual envelope/sender.
        // This avoids most provider rejection (SPF/DKIM) while making the message
        // appear to come from the visitor in mailbox UI. Reply-To is set to visitor email.
        const mailOptions = {
            from: {
                name: name || 'Website Visitor',
                address: mailFrom,
            },
            to: mailTo,
            // keep replyTo set to visitor email so replies still go to them
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
            html: `<p>You have a new contact form submission:</p>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject}</p>
                   <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Contact email sent:', info && info.messageId);

        // increment count after successful send
        record.count += 1;

        // Persist the submission to DB if enabled via env var (non-blocking for client response)
        try {
            if (String(process.env.CONTACT_PERSIST_SUBMISSIONS).toLowerCase() === 'true') {
                const submission = {
                    name,
                    email,
                    subject,
                    message,
                    ip,
                    userAgent: req.get('User-Agent') || null,
                    createdAt: new Date(),
                };
                // services.saveContact may throw; we catch to avoid failing the request
                await services.saveContact(submission);
                console.log('Contact submission saved to DB');
            } else {
                console.log('Contact persistence disabled by CONTACT_PERSIST_SUBMISSIONS env var; skipping DB save');
            }
        } catch (dbErr) {
            console.error('Failed to save contact submission to DB:', dbErr);
            // do not return error to client; email was already sent
        }

        return res.json({ message: 'Email received successfully' });
    } catch (err) {
        console.error('Error in sendContact controller:', err);
        return res.status(500).json({ error: 'Failed to receive email' });
    }
}

module.exports = {
    getSkillSet,
    getExperience,
    getContactInfo,
    sendContact,
    getAboutMe,
    getProjects,
};
