// /client/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Plan from "./views/Plan";
import Home from "./views/Home";
import NewPlan from "./views/NewPlan";
import NotFound from "./views/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new_plan" component={NewPlan} />
          <Route path="/plan/:id/:any" component={NotFound} />
          <Route path="/plan/:id" component={Plan} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
