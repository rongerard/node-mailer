import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing to, subject, or text fields' });
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

app.listen(3000, () => {
    console.log('🚀 Server is running at http://localhost:3000');
});
