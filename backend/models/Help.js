import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    // matches the options in your frontend <select>
    enum: ["General Inquiry", "Order Support", "Product Returns", "Partnership"], 
    default: "General Inquiry"
  },
  message: {
    type: String,
    required: [true, "Message content cannot be empty"],
    minLength: [10, "Message must be at least 10 characters long"]
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  }
}, { 
  timestamps: true 
});

const helpModel = mongoose.model("Help", helpSchema);
export default helpModel;