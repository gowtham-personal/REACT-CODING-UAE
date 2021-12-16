import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./helper/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./screens/Header/views/header";
import Container from "@material-ui/core/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * Base Structure of the APP
 * @returns
 */
const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
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
