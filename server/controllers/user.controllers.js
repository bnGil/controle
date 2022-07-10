import { User } from "../models/user/user.model";

export const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
