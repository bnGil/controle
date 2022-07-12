import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./navbar.css";
import { userContext } from "../../context/userContext";

function Navbar() {
  const { user, setUser } = useContext(userContext);
  return (
    <div className="navbar-container">
      <nav className="navbar">
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
        <div></div>
      </nav>
    </div>
  );
}

export default Navbar;
