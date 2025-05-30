import mongoose from "mongoose";
import client from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("Error in Connnecting to MongoDB", error);
    process.exit(1); // 1: Failure
  }
};
