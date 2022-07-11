import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
