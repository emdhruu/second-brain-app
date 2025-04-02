import mongoose from "mongoose";

const mongodb_url = process.env.MONGODB_URL;

console.log(mongodb_url);

if (!mongodb_url) {
  throw new Error("MONGODB-URI is not defined in environment variable file.");
}

export const connectDB = async () => {
  try {
    const mongodbURI = mongodb_url;
    const connect = await mongoose.connect(mongodbURI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("Error occuied while connecting db", error);
  }
};
