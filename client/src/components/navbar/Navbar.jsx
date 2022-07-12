import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./navbar.css";
import { userContext } from "../../context/userContext";

function Navbar() {
  const { user, setUser } = useContext(userContext);
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h1>Logo</h1>
        <div className="links-container">
          <NavLink className="navlink" exact to="/">
            Home
          </NavLink>
          <NavLink className="navlink" to="/about">
            About
          </NavLink>
          <NavLink className="navlink" to="/jobs">
            Jobs
          </NavLink>
          <NavLink className="navlink" to="/applications">
            My Applications
          </NavLink>
        </div>
        <div className="linkes-container">
          <NavLink className="navlink" exact to="/register">
            Register
          </NavLink>
          <NavLink className="navlink" exact to="/login">
            Login
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
