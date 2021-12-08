import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./helper/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./screens/Header/views/header";
import Container from "@material-ui/core/Container";

/**
 * Base Structure of the APP
 * @returns
 */
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container maxWidth="lg">
          <RoutesComponent />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
