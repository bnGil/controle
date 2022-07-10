import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userSchema } from "./user.schema";

// methods are instance methods
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({}, process.env.JWT_SECRET);
};

// statics are model methods
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  next();
});

export const User = mongoose.model("User", userSchema);
