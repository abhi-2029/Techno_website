/**
 * CARD Technocrats & Engineers LLP - Mailer Utility
 * 
 * Senior Developer Notes:
 * - Uses Nodemailer to route email notifications to the admin.
 * - Safely logs output to console if SMTP credentials are not configured,
 *   preventing any API runtime crashes during demos.
 */

import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Check if SMTP is configured
    if (!smtpUser || !smtpPass || smtpPass === 'your_app_password') {
      console.log('\n⚠️ [SMTP Mailer] SMTP NOT CONFIGURED IN .env. PRINTING NOTIFICATION PREVIEW:');
      console.log(`TO: ${to}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`HTML BODY:\n${html}`);
      console.log('--------------------------------------------------\n');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // TLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"CARD System Alerts" <${smtpUser}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ [SMTP Mailer] Notification sent successfully! MessageID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ [SMTP Mailer] Email dispatch failed:', error.message);
    // Silent fail to ensure request lifecycle completes successfully
  }
};

/**
 * Send Admin Notification for New Contact Form Submission
 */
export const notifyAdminOfContact = async ({ name, email, phone, subject, message }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  const html = `
    <h2>New Website Inquiry: ${subject}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    <hr/>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <br/>
    <p><small>This alert was generated automatically from the CARD Technocrats Portal.</small></p>
  `;
  return sendEmail({ to: adminEmail, subject: `[New Lead] ${subject}`, html });
};

/**
 * Send Admin Notification for New Job Application
 */
export const notifyAdminOfApplication = async ({ jobTitle, name, email, phone, coverLetter, resumeUrl }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  const html = `
    <h2>New Job Application: ${jobTitle}</h2>
    <p><strong>Applicant Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Resume URL:</strong> <a href="${resumeUrl}">View Document</a></p>
    <hr/>
    <p><strong>Cover Letter / Statement:</strong></p>
    <p>${coverLetter}</p>
    <br/>
    <p><small>Review this application in your Admin Dashboard.</small></p>
  `;
  return sendEmail({ to: adminEmail, subject: `[New Application] ${jobTitle} - ${name}`, html });
};

/**
 * Send Admin Notification for New Travel Booking
 */
export const notifyAdminOfBooking = async ({ type, user, from, to, date, passengers }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  const html = `
    <h2>New ${type} Booking Request</h2>
    <p><strong>Requested By:</strong> ${user.name} (${user.email})</p>
    <p><strong>From:</strong> ${from}</p>
    <p><strong>To:</strong> ${to}</p>
    <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
    <p><strong>Passengers:</strong> ${passengers}</p>
    <br/>
    <p><small>Review and confirm this booking in your Admin Dashboard.</small></p>
  `;
  return sendEmail({ to: adminEmail, subject: `[New ${type} Booking] ${user.name}`, html });
};

