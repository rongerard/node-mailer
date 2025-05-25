import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

// Default subject and text you can change here
const DEFAULT_SUBJECT = "Hello from Nodemailer!";
const DEFAULT_TEXT = "Hi there, this message is for: "; // recipient email will be appended

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Validate recipients
    if (!Array.isArray(to) || to.length === 0) {
        return res.status(400).json({ error: 'Missing or invalid "to" array' });
    }

    // Use subject and text from request or fall back to defaults
    const emailSubject = subject || DEFAULT_SUBJECT;
    const emailTextBase = text || DEFAULT_TEXT;

    try {
        // Send individual emails personalized with recipient email inside the text
        for (const recipient of to) {
            const personalizedText = `${emailTextBase} ${recipient}`;

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: recipient,
                subject: emailSubject,
                text: personalizedText,
            });
        }

        res.status(200).json({ message: 'Emails sent successfully to all recipients' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send emails', details: error.message });
    }
});

app.listen(3000, () => {
    console.log('📨 Server running at http://localhost:3000');
});
