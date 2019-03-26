import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";

import { Container } from "semantic-ui-react";
import Navbar from "./component/Navbar.jsx";

import LocationForm from "./component/LocationForm";

class App extends Component {
  render() {
    return (
      <Router>
        <Container className="App">
          <Navbar />
          <Route
            exact
            path="/"
            component={() => <Redirect to="/locations" />}
          />
          <Route path="/locations" component={LocationForm} />
        </Container>
      </Router>
    );
  }
}

export default App;
