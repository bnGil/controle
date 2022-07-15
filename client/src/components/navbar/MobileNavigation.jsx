import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import "./navigation.css";

function MobileNavigation({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      disableAutoFocus
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
      {user && (
        <a href="#" onClick={logout}>
          Logout
        </a>
      )}
      {!user && (
        <NavLink onClick={() => setIsOpen(false)} to="/register">
          Register
        </NavLink>
      )}
      {!user && (
        <NavLink onClick={() => setIsOpen(false)} to="/login">
          Login
        </NavLink>
      )}
    </Menu>
  );
}

export default MobileNavigation;
