import mongoose from "mongoose";
import "dotenv/config";

const URL = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(URL, (err, mongoDBInstance) => {
  if (err) throw Error("MongoDB connection Error: " + err);
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    const { host, port, name } = mongoDBInstance;
    console.log({ host, port, name });
  }
});
