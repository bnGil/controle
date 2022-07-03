import { NavLink } from "react-router-dom";

import "./header.css";

function Header() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="links-container">
          <NavLink className="navlink" exact to="/">
            Home
          </NavLink>
          <NavLink className="navlink" to="/api/v1">
            Docs
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Header;
