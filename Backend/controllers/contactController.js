const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const sendContactEmail = async (req, res) => {
  const { name, email, description } = req.body;

  // Validation
  if (!name || !email || !description) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create a new Contact instance (optional, for logging or database)
  const contact = new Contact(name, email, description);

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, // Sender's email (user's email)
    to: 'rohinthchezhian@gmail.com', // Your email
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}\nTimestamp: ${contact.timestamp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};

module.exports = { sendContactEmail };