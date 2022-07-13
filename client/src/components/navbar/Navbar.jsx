import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./navbar.css";
import { useUser } from "../../context/userContext";

function Navbar() {
  const { user, logout } = useUser();

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
          {user ? (
            <a href="#" className="navlink" onClick={logout}>
              Logout
            </a>
          ) : (
            <>
              <NavLink className="navlink" exact to="/register">
                Register
              </NavLink>
              <NavLink className="navlink" exact to="/login">
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
