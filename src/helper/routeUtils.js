import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookies } from "../helper/cookies";

/**
 * To render component and protect private routes
 * @param {*} path
 * @param {*} Component
 * @param {*} isExact
 * @param {*} isPublicRoute
 * @returns
 */
export const renderComponent = (path, Component, isExact, isPublicRoute) => {
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
