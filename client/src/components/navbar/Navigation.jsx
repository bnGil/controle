import { NavLink } from "react-router-dom";

import "./navigation.css";

function Navigation({ user, logout, token }) {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <NavLink className="logo" exact to="/">
          Cont<span>role</span>
        </NavLink>
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
        <div className="rslinks-container">
          {token ? (
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

export default Navigation;
