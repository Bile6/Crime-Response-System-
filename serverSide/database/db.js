import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;