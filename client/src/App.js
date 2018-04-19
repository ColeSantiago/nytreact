import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
// import Saved from "./pages/Saved";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route path="/" component={Articles} />
        
      </Switch>
    </div>
  </Router>
);

export default App;

// <Route exact path="/saved/articles" component={Saved} />


