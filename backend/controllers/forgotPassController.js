import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Controller for sending url to user for reset mail
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "No account with that email exists." });
    }

    const secret = process.env.JWT_SECRET + user.password;

    // using "secret key" with prev pass so that hacker not able to access the link multiple times coz secret changes as password changes

    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "15m",
    });
    // creating token

    // Create the Reset URL (Frontend link)
    const resetUrl = `http://localhost:5173/resetpass/${user._id}/${token}`;


    // Have to change after backend deployment //

    // Send the Email
    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to set a new password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Token",
      html: message,
    });

    res.json({ msg: "Email sent! Check your inbox." });
  } catch (err) {
    res.json({ msg: "Server Error" });
  }
};

// The main reset controller
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const secret = process.env.JWT_SECRET + user.password;

  // 1. Verify token
  try {
    jwt.verify(token, secret);

    // 2. If valid, hash and update the new password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ msg: "Password Reset Successful!" });
  } catch (error) {
    res.status(400).json({ msg: "Invalid or Expired Link" });
  }
};
