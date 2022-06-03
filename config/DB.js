import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected on ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
