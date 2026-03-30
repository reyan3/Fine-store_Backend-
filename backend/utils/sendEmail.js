import nodemailer from "nodemailer";

export const sendConfirmationEmail = async (userEmail, userName) => {
  // 1. Create a "transporter" (your email server login)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your App Password
    },
  });

  // 2. Define the email content
  const mailOptions = {
    from: `"FineStore Support" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "We received your request! - FineStore",
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #334155;">
        <h1 style="color: #4f46e5;">Hi ${userName},</h1>
        <p>Thanks for reaching out to <strong>FineStore</strong>.</p>
        <p>This is a confirmation that we have received your request. Our team is currently reviewing it and will get back to you shortly.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">This is an automated message. Please do not reply directly to this email.</p>
      </div>
    `,
  };

  // 3. Send it!
  await transporter.sendMail(mailOptions);
};

export const sendEmail = async (opt) => {
  // Accept an 'options' object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"FineStore Support" <${process.env.EMAIL_USER}>`,
    to: opt.to, // Dynamic recipient
    subject: opt.subject, // Dynamic subject
    html: opt.html, // Dynamic HTML content
  };

  await transporter.sendMail(mailOptions);
};

export const sendOrderConfirmEmail = async (userEmail, orderId, totalAmount) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });
const mailOptions = {
  from: `"FineStore Support" <${process.env.EMAIL_USER}>`,
  to: userEmail,
  subject: `Order Confirmed: #${orderId.toString().slice(-8).toUpperCase()}`,
  html: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Order Confirmed!</h1>
      </div>
      <div style="padding: 40px;">
        <p style="color: #374151; font-size: 16px;">Hi there,</p>
        <p style="color: #6b7280; font-size: 16px;">Thanks for shopping with <b>FineStore</b>. We’ve received your order and it’s now being processed.</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <p style="margin: 5px 0; color: #374151;"><b>Order ID:</b> #${orderId.toString().slice(-8).toUpperCase()}</p>
          <p style="margin: 5px 0; color: #374151;"><b>Total Amount:</b> ₹${totalAmount.toLocaleString()}</p>
        </div>

        <a href="http://localhost:5173/my-orders" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Order Status</a>
        
        // Have to change after backend deployment //

      </div>
      <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
        FineStore Inc. | Zirakpur, Punjab
      </div>
    </div>
  `,
};

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email error:", error);
  }
};
