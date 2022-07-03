import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./pages/homepage/Homepage";
import Docs from "./pages/docs/Docs";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/api/v1" component={Docs} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
