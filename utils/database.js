import mongoose from 'mongoose';

let isConnected = false; // Track connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) throw new Error("MongoDB URI is not defined!");

    await mongoose.connect(dbUri, {
      dbName: process.env.DB_NAME || "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error; // Re-throw to stop execution
  }
};
