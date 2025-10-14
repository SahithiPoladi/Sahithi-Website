const nodemailer = require('nodemailer');

/**
 * Simple scheduler to send a configured number of emails evenly over a duration.
 * Configuration via environment variables:
 *  - SCHEDULER_ENABLED (true/false)
 *  - SCHEDULE_EMAIL_COUNT (number, default 25)
 *  - SCHEDULE_DURATION_MINUTES (number, default 60)
 *  - MAIL_FROM, MAIL_TO, SMTP_* (used by nodemailer)
 */

const DEFAULT_COUNT = 25;
const DEFAULT_DURATION_MINUTES = 60;

let _timer = null;
let _stopped = false;

function isEnabled() {
    return String(process.env.SCHEDULER_ENABLED || '').toLowerCase() === 'true';
}

async function createTransporter() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
        throw new Error('SMTP configuration missing for scheduler');
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.verify();
    return transporter;
}

function buildMessage(index) {
    const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;
    const mailTo = process.env.MAIL_TO;
    const subject = `Scheduled Test Email #${index + 1}`;
    const text = `This is scheduled test email number ${index + 1} sent by the automated scheduler.`;
    return {
        from: { name: 'Scheduler', address: mailFrom },
        to: mailTo,
        subject,
        text,
    };
}

async function start(options = {}) {
    if (!isEnabled()) {
        console.log('Email scheduler is disabled (SCHEDULER_ENABLED not true).');
        return;
    }

    const total = parseInt(process.env.SCHEDULE_EMAIL_COUNT || options.count || DEFAULT_COUNT, 10) || DEFAULT_COUNT;
    const durationMinutes = parseInt(process.env.SCHEDULE_DURATION_MINUTES || options.durationMinutes || DEFAULT_DURATION_MINUTES, 10) || DEFAULT_DURATION_MINUTES;

    if (total <= 0) {
        console.log('No emails to send (SCHEDULE_EMAIL_COUNT <= 0)');
        return;
    }

    try {
        const transporter = await createTransporter();
        console.log(`Email scheduler will send ${total} messages over ${durationMinutes} minute(s)`);

        const durationMs = durationMinutes * 60 * 1000;
        const intervalMs = Math.max(1000, Math.floor(durationMs / total));

        let sent = 0;

        _stopped = false;

        _timer = setInterval(async () => {
            if (_stopped) return;
            if (sent >= total) {
                stop();
                console.log('Email scheduler completed all sends.');
                return;
            }

            const idx = sent;
            const msg = buildMessage(idx);
            try {
                const info = await transporter.sendMail(msg);
                sent += 1;
                console.log(`Scheduler: sent ${sent}/${total} messageId=${info && info.messageId}`);
            } catch (err) {
                console.error(`Scheduler: failed to send message #${idx + 1}:`, err && err.message);
            }
        }, intervalMs);

        // Safety: also set a hard timeout to stop after duration + 1 minute
        setTimeout(() => {
            if (sent < total) {
                console.warn(`Scheduler: duration elapsed but only sent ${sent}/${total}. Stopping.`);
            }
            stop();
        }, durationMs + 60 * 1000);
    } catch (err) {
        console.error('Email scheduler failed to start:', err && err.message);
    }
}

function stop() {
    _stopped = true;
    if (_timer) {
        clearInterval(_timer);
        _timer = null;
    }
}

module.exports = { start, stop, isEnabled };
