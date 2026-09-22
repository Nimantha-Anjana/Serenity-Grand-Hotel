import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an OTP verification email to the new customer.
 */
export async function sendOtpEmail(toEmail, otpCode) {
  console.log(`\n========================================`);
  console.log(`[OTP CODE FOR ${toEmail}]: ${otpCode}`);
  console.log(`========================================\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('[sendEmail] EMAIL_USER or EMAIL_PASS not set in .env. Skipping actual SMTP email dispatch.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Serenity Grand Hotel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code – Serenity Grand Hotel',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1B2A41; color: #fff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1B2A41, #2a3f5f); padding: 40px 40px 20px; text-align: center;">
          <h1 style="color: #C9A227; letter-spacing: 3px; font-size: 22px; margin: 0;">SERENITY GRAND HOTEL</h1>
          <p style="color: #aaa; font-size: 12px; letter-spacing: 2px; margin-top: 6px;">EMAIL VERIFICATION</p>
        </div>
        <div style="padding: 40px; text-align: center;">
          <p style="color: #ccc; font-size: 16px; margin-bottom: 30px;">
            Thank you for registering. Use the code below to verify your email address:
          </p>
          <div style="display: inline-block; background: #C9A227; color: #1B2A41; font-size: 36px; font-weight: bold;
                      letter-spacing: 10px; padding: 20px 40px; border-radius: 8px; margin: 10px 0;">
            ${otpCode}
          </div>
          <p style="color: #999; font-size: 13px; margin-top: 30px;">
            This code expires in <strong>10 minutes</strong>. Do not share it with anyone.
          </p>
        </div>
        <div style="background: #111; padding: 20px; text-align: center;">
          <p style="color: #555; font-size: 12px; margin: 0;">© 2024 Serenity Grand Hotel. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Send a password reset email with a link.
 */
export async function sendResetEmail(toEmail, resetLink) {
  const mailOptions = {
    from: `"Serenity Grand Hotel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Request – Serenity Grand Hotel',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1B2A41; color: #fff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1B2A41, #2a3f5f); padding: 40px 40px 20px; text-align: center;">
          <h1 style="color: #C9A227; letter-spacing: 3px; font-size: 22px; margin: 0;">SERENITY GRAND HOTEL</h1>
          <p style="color: #aaa; font-size: 12px; letter-spacing: 2px; margin-top: 6px;">PASSWORD RESET</p>
        </div>
        <div style="padding: 40px; text-align: center;">
          <p style="color: #ccc; font-size: 16px; margin-bottom: 30px;">
            We received a request to reset your password. Click the button below to set a new password:
          </p>
          <a href="${resetLink}" style="display: inline-block; background: #C9A227; color: #1B2A41; font-weight: bold;
                      font-size: 15px; padding: 15px 35px; border-radius: 6px; text-decoration: none; margin: 10px 0;">
            Reset My Password
          </a>
          <p style="color: #999; font-size: 13px; margin-top: 30px;">
            This link expires in <strong>1 hour</strong>. If you did not request a reset, ignore this email.
          </p>
        </div>
        <div style="background: #111; padding: 20px; text-align: center;">
          <p style="color: #555; font-size: 12px; margin: 0;">© 2024 Serenity Grand Hotel. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
