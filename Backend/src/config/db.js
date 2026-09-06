import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("Error connection to mongoDB", error);
    process.exit(1); // Exit the process with an error code
  }
};
