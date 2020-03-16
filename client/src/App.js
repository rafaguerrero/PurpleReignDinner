// /client/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Plan from "./views/Plan";
import Home from "./views/Home";
import NewPlan from "./views/NewPlan";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route exact path="/new_plan" children={<NewPlan />} />
          <Route path="/:id" children={<Plan />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
