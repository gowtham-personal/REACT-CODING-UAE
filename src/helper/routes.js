import React, { useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emitEventToReducer } from "../screens/Header/services/headerActions";
import { getCookies } from "../helper/cookies";

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
      <Switch>{renderComponent("/signup", Signup, true)}</Switch>
      <Switch>{renderComponent("/home", NyTimesHome, false)}</Switch>
      <Switch>
        {renderComponent("/category/:newsType", NyTimesHome, false)}
      </Switch>
      <Switch>
        {renderComponent("/article/:articleHash", NyTimesArticles, false)}
      </Switch>
      <Switch>{renderComponent("/search", SearchArticle, false)}</Switch>
    </div>
  );
};

const renderComponent = (path, Component, isExact, isPublicRoute) => {
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
          if (checkLoggedInUser() || isPublicRoute) {
            return (
              <React.Suspense fallback={"...loading"}>
                <Component {...props} />
              </React.Suspense>
            );
          } else {
            return <Redirect to={{ pathname: "/" }} />;
          }
        }}
      />
    );
  }
};

const checkLoggedInUser = () => {
  if (getCookies("ACCESS_TOKEN")) return true;
  return false;
};

export default RoutesComponent;
