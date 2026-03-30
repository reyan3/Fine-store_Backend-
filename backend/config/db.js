import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection Established!");
  } catch (err) {
    console.error("error is  : ", err.message);
  }
};

export default connectDB;
