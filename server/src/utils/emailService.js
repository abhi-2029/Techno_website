import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'dummy@example.com',
      pass: process.env.SMTP_PASS || 'dummy-password',
    },
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"CARD Technocrats & Engineers" <${process.env.SMTP_USER || 'no-reply@cardtechnocrats.com'}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    // We don't throw the error so that email failures don't crash the main API flow
    return false;
  }
};

export const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to CARD Technocrats & Engineers';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">Welcome to CARD Technocrats, ${userName}!</h2>
      <p>Thank you for registering on our secure client portal.</p>
      <p>You can now apply for government registrations, engineering services, and travel bookings directly from your dashboard.</p>
      <p>If you have any questions, feel free to reply to this email.</p>
      <br />
      <p>Best regards,<br/>The CARD Technocrats Team</p>
    </div>
  `;
  return sendEmail({ to: userEmail, subject, html });
};

export const sendApplicationEmail = async (userEmail, serviceTitle, applicantName) => {
  const subject = `Application Received: ${serviceTitle}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">Application Received</h2>
      <p>Dear ${applicantName},</p>
      <p>We have successfully received your application for <strong>${serviceTitle}</strong>.</p>
      <p>Our team is currently reviewing your documents. You can track the live status and check for any generated invoices on your secure Client Dashboard.</p>
      <br />
      <p>Best regards,<br/>The CARD Technocrats Team</p>
    </div>
  `;
  return sendEmail({ to: userEmail, subject, html });
};

export const sendBookingEmail = async (userEmail, bookingType, passengerName) => {
  const subject = `Booking Confirmed: ${bookingType}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">Travel Booking Request Received</h2>
      <p>Dear ${passengerName},</p>
      <p>We have received your ${bookingType.toLowerCase()} booking request.</p>
      <p>Our travel desk will process this shortly and update the status on your Client Dashboard. We will reach out if further details are required.</p>
      <br />
      <p>Best regards,<br/>The CARD Technocrats Team</p>
    </div>
  `;
  return sendEmail({ to: userEmail, subject, html });
};
