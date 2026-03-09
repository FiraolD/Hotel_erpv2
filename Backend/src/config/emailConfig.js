// backend/src/config/emailConfig.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: verify connection
transporter.verify((error, success) => {
  if (error) console.error("Email connection error:", error);
  else console.log("Email server is ready to send messages");
});