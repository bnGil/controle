import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import controleAPI from "../api/controleAPI";

export const userContext = createContext();

export function useUser() {
  return useContext(userContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const history = useHistory();

  const login = async (email, password) => {
    const { data } = await controleAPI.post("/user/login", {
      email,
      password,
    });

    setToken(data.token);
    setCookie("token", data.token);
    setUser(data.user);
    history.push("/");
  };

  const register = async (newUser) => {
    const { data } = await controleAPI.post("/user/register", newUser);
    setToken(data.token);
    setCookie("token", data.token);
    setUser(data.user);
    history.push("/");
  };

  const logout = async () => {
    await controleAPI.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    removeCookie("token");
    setToken("");
    setUser(null);
    history.push("/");
  };

  // const getUser = async (token) => {
  //   const { data } = await controleAPI.get("/user/me", {
  //     headers: {
  //       Authorization: token,
  //     },
  //   });

  //   setUser(data.user);
  //   return data.user;
  // };

  const value = {
    user,
    token,
    login,
    register,
    logout,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export default UserProvider;
