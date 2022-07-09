import mongoose from "mongoose";
import validator from "validator";

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Please enter a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw Error(
          "Your password must be at least 8 chars and must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and one symbol"
        );
      }
    },
  },
});
