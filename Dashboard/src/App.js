import React from "react";
import "./App.css";
import Component from "./components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App(){

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" component={Component} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
