import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../../components/button/Button";
import PopUp from "../../components/popUp/PopUp";
import { useUser } from "../../context/userContext";
import "./applicationsPage.css";

function ApplicationsPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <PopUp text={"Please sign in first"}>
        <NavLink exact to="/login">
          <Button text={"Login"}></Button>
        </NavLink>
        <NavLink exact to="/register">
          <Button text={"Register"}></Button>
        </NavLink>
      </PopUp>
    );
  }

  return <h1>applications</h1>;
}

export default ApplicationsPage;
