import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import "./navigation.css";

function MobileNavigation({ token, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      disableAutoFocus
      right
    >
      <NavLink onClick={() => setIsOpen(false)} exact to="/">
        Home
      </NavLink>
      <NavLink onClick={() => setIsOpen(false)} to="/about">
        About
      </NavLink>
      <NavLink onClick={() => setIsOpen(false)} to="/jobs">
        Jobs
      </NavLink>
      <NavLink
        className="space-link"
        onClick={() => setIsOpen(false)}
        to="/applications"
      >
        My Applications
      </NavLink>
      {token && (
        <a href="#" onClick={logout}>
          Logout
        </a>
      )}
      {!token && (
        <NavLink onClick={() => setIsOpen(false)} to="/register">
          Register
        </NavLink>
      )}
      {!token && (
        <NavLink onClick={() => setIsOpen(false)} to="/login">
          Login
        </NavLink>
      )}
    </Menu>
  );
}

export default MobileNavigation;
