import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Default subject and text
const DEFAULT_SUBJECT = "Hello from Nodemailer!";
const DEFAULT_TEXT = "Hi there, this message is for:";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text, surname, account } = req.body;

  // Validate recipients and corresponding arrays
  if (
    !Array.isArray(to) ||
    to.length === 0 ||
    !Array.isArray(surname) ||
    !Array.isArray(account) ||
    to.length !== surname.length ||
    to.length !== account.length
  ) {
    return res.status(400).json({
      error:
        'Invalid input. Ensure "to", "surname", and "account" arrays are provided and have the same length.',
    });
  }

  const emailSubject = subject || DEFAULT_SUBJECT;
  const emailTextBase = text || DEFAULT_TEXT;

  try {
    for (let i = 0; i < to.length; i++) {
      const recipient = to[i];
      const userSurname = surname[i];
      const userAccount = account[i];

      const personalizedText = `Good day, ${userSurname},

This is the IT Staff from your school’s ICT/IT Department.

Here is your Office 365 account: ${userAccount}
Your temporary password is: ${process.env.TEMPORARYPASSWORD}

Please refer to the attached file for detailed instructions:
*Office 365 Account Manual*

Thank you,
ICT/IT Department
Your School
`;

      //PDF FILE ATTACHED CAN BE REMOVE
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: "Your Office 365 Account Details and User Manual",
        text: personalizedText,
        attachments: [
          {
            filename: "Office 365 Account Manual for New Students.pdf",
            path: "C:/Users/Ron/OneDrive/Desktop/CEIS STUFFS/Office 365 Account Manual for New Students.pdf",
            contentType: "application/pdf",
          },
        ],
      });
    }

    res
      .status(200)
      .json({ message: "Emails sent successfully to all recipients" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send emails", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("📨 Server running at http://localhost:3000");
});
