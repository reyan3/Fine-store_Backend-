import helpModel from "../models/Help.js";
import { sendConfirmationEmail } from "../utils/sendEmail.js";

export const submitHelpForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  // 1. Basic check for missing fields (backup for frontend validation)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  // 2. Create a new entry in the 'helps' collection
  const newHelpRequest = new helpModel({
    name,
    email,
    subject,
    message,
  });
  // 3. Save to Database
  await newHelpRequest.save();

  try {
    await sendConfirmationEmail(email, name);
    // Send the confirmation mail to user
  } catch (err) {
    console.error("Error is : ", err.message);
  }
  // 4. Send success response to frontend
  res.json({
    message: "Message received! Check your email for confirmation.",
  });
};
