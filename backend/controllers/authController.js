import userModel from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// New User signUp
export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.json({
      msg: "User Already Exists...",
    });
  } else {
    //   Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashpassword,
      isAdmin: false,
      avatar: `https://api.dicebear.com/9.x/rings/svg?seed=${name}`,
    });
    const created = await newUser.save();
    res.json({
      msg: "Account Created Successfully and you can now Login!",
      data: created,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({
      msg: "User Not Exists...",
    });
  } else {
    if (!user.password) {
      return res.json({
        msg: "This account was created via Google. Please log in with Google.",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({
        msg: "Invalid Credentials",
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        msg: "Login Successfull!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
        },
      });
    }
  }
};

// Login/Create user from google email
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  // 1. Verify the token with GoogleID given in .env
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  // getPayload unwraps the token(ticket)
  const { email, name } = ticket.getPayload();

  // 2. Check if user exists in your MongoDB
  let user = await userModel.findOne({ email });

  if (!user) {
    // 3. Create user if they don't exist
    user = await userModel.create({
      name,
      email,
      isAdmin: false,
      avatar: `https://api.dicebear.com/9.x/rings/svg?seed=${name}`,
      // Password is not needed for Google users
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    },
    msg: "Login successful",
  });
};

export const deleteAcc = async (req, res) => {
  const { id } = req.params;

  const deletion = await userModel.findByIdAndDelete(id);

  res.json({ msg: `Deletion of account id ${deletion._id} Completed!` });
};
