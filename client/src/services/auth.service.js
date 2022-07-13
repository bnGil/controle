import { useContext } from "react";

import controleAPI from "../api/controleAPI.js";

const login = async (email, password) => {
  const { data } = await controleAPI.post("/login", {
    email,
    password,
  });
};
