import { NavLink } from "react-router-dom";

import "./homepage.css";

function Homepage() {
  return (
    <header className="landing">
      <div className="landing-content">
        <h1 className="landing-h1">
          Take control of your job search and manage your candidacies for all
          the companies you are targeting
        </h1>
        <NavLink to="/jobs">
          <button className="landing-btn">Browse Jobs</button>
        </NavLink>
      </div>
    </header>
  );
}

export default Homepage;
