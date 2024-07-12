import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://kec:${encodeURIComponent(
        "kec1234"
      )}@school.b6qkdnb.mongodb.net/kec-b4-foodmandu?retryWrites=true&w=majority&appName=School`
    );

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDB;
