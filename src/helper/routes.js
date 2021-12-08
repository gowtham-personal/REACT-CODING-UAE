import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emitEventToReducer } from "../screens/Header/services/headerActions";

const NyTimesHome = React.lazy(() =>
  import("../screens/NyTimes/views/nyTimesHome")
);

const NyTimesArticles = React.lazy(() =>
  import("../screens/NyTimes/views/nyTimesArticle")
);

const SearchArticle = React.lazy(() =>
  import("../screens/NyTimes/views/searchArticle")
);

const Login = React.lazy(() => import("../screens/Login/views/login"));
const Signup = React.lazy(() => import("../screens/Login/views/signup"));

/**
 * Config for client side routing using react lazy loading
 * @returns
 */
const RoutesComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Location changed", location);
    dispatch(
      emitEventToReducer({ type: "SET_CURRENT_LOCATION", payload: location })
    );
  }, [location]);
  return (
    <div className="container">
      <Switch>{renderComponent("/", Login, true)}</Switch>
      <Switch>{renderComponent("/signup", Signup)}</Switch>
      <Switch>{renderComponent("/home", NyTimesHome)}</Switch>
      <Switch>{renderComponent("/category/:newsType", NyTimesHome)}</Switch>
      <Switch>
        {renderComponent("/article/:articleHash", NyTimesArticles)}
      </Switch>
      <Switch>{renderComponent("/search", SearchArticle)}</Switch>
    </div>
  );
};

const renderComponent = (path, Component, isExact) => {
  if (isExact) {
    return (
      <Route
        path={path}
        exact
        render={(props) => {
          return (
            <React.Suspense fallback={"...loading"}>
              <Component {...props} />
            </React.Suspense>
          );
        }}
      />
    );
  } else {
    return (
      <Route
        path={path}
        render={(props) => {
          return (
            <React.Suspense fallback={"...loading"}>
              <Component {...props} />
            </React.Suspense>
          );
        }}
      />
    );
  }
};

export default RoutesComponent;
