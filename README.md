# Overview

This project is a simple Node.js and Express server designed to send emails using Gmail through Nodemailer. It supports sending messages to multiple recipients and allows optional custom subjects and text messages. Each email is personalized by including the recipient’s email address in the message body.

---

## Project Structure

The main files in this project include:

1. **`.env` file** – Stores your email account credentials securely. This file should remain private and should never be committed to version control.
2. **`server.js`** – The main server file that runs Express, configures Nodemailer, and handles sending emails through the `/send-email` endpoint.
3. **`README.md`** – This documentation file explaining setup and usage instructions.

---

## Environment Variables

The `.env` file contains the necessary email credentials for sending emails. These include:

- **EMAIL_USER** – The Gmail address that will be used to send emails.
- **EMAIL_APP_PASSWORD** – The Gmail password or app password if two-factor authentication is enabled.

It is important to keep this file private to prevent exposing sensitive credentials.

---

## Server Functionality

The server exposes a single endpoint, `/send-email`, which accepts requests to send emails to multiple recipients. It allows optional custom subject and message text, but if these are not provided, default values are used.

When sending emails, each recipient receives a personalized message that includes their own email address. The server responds with a confirmation message if all emails are sent successfully, or an error message if sending fails.

The server runs locally on port 3000 and logs a message when it is ready to accept requests.

---

## How to Use

To use the email server:

1. Install the required Node.js packages for Express, Nodemailer, and dotenv.
2. Create a `.env` file in the project root and add your email credentials.
3. Start the server to allow it to listen for email requests.
4. Send a POST request to the `/send-email` endpoint with a list of recipient emails and optional subject and text messages.
5. The server sends individual emails to each recipient and returns a success message once completed.

---

## Notes and Best Practices

- Always use an app password for Gmail accounts with two-factor authentication to ensure secure access.
- Never commit the `.env` file with real credentials to version control.
- The server is designed for local testing and small-scale email sending. For production, consider using proper email service configurations and limits.
- You can use tools like Prettier and ESLint to maintain clean and consistent code formatting for the `server.js` file.

---

## Example `.env` Reference

For reference, your `.env` file structure should look like this:

- Email account used to send emails via Nodemailer: `EMAIL_USER=your-email@gmail.com`
- App password (use app password if 2FA is enabled): `EMAIL_APP_PASSWORD=your-app-password`
