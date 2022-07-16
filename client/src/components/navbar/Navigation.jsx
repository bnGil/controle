import { NavLink } from "react-router-dom";

import "./navigation.css";

function Navigation({ logout, token }) {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <NavLink className="logo" exact to="/">
          Cont<span>role</span>
        </NavLink>
        <div className="links-container">
          <NavLink className="menu-li" exact to="/">
            Home
          </NavLink>
          <NavLink className="menu-li" to="/about">
            About
          </NavLink>
          <NavLink className="menu-li" to="/jobs">
            Jobs
          </NavLink>
          <NavLink className="menu-li" to="/applications">
            My Applications
          </NavLink>
        </div>
        <div className="rslinks-container">
          {token ? (
            <a href="#" className="menu-li" onClick={logout}>
              Logout
            </a>
          ) : (
            <>
              <NavLink className="menu-li" exact to="/register">
                Register
              </NavLink>
              <NavLink className="menu-li" exact to="/login">
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
