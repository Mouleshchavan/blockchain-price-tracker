const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from the .env file

// Create a transporter using environment variables for credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Mailgun, etc.)
  auth: {
    user: process.env.EMAIL_USER,  // Fetch email from .env
    pass: process.env.EMAIL_PASS,  // Fetch password from .env
  },
});

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER,  // Use your email from .env
  to: 'hyperhire_assignment@hyperhire.in', // Recipient's email
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer!',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
