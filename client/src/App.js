import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import AboutPage from "./pages/about/AboutPage";
import ApplicationsPage from "./pages/applicationsPage/ApplicationsPage";
import Homepage from "./pages/homepage/Homepage";
import JobsPage from "./pages/jobsPage/JobsPage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/jobs" component={JobsPage} />
          <Route exact path="/applications" component={ApplicationsPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
