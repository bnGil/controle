import { sendWelcomeEmail } from "../emails/user.js";
import { User } from "../models/user/user.model.js";

export const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const registerUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.firstName);
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
