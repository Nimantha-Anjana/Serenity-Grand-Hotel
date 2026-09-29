import nodemailer from 'nodemailer';

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

export async function sendOtpEmail(to, otp) {
  const transporter = getTransporter();
  if (!transporter) { console.log(`[DEV OTP] ${to}: ${otp}`); return; }
  await transporter.sendMail({ from: `"Serenity Grand Hotel" <${process.env.EMAIL_USER}>`, to, subject: 'Serenity Grand Hotel - Email Verification', text: `Your verification code is ${otp}. It expires in 10 minutes.` });
}

export async function sendResetEmail(to, link) {
  const transporter = getTransporter();
  if (!transporter) { console.log(`[DEV PASSWORD RESET] ${to}: ${link}`); return; }
  await transporter.sendMail({ from: `"Serenity Grand Hotel" <${process.env.EMAIL_USER}>`, to, subject: 'Serenity Grand Hotel - Password Reset', html: `<p>Reset your password using <a href="${link}">this link</a>. It expires in 1 hour.</p>` });
}
