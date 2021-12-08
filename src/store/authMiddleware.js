import { getCookies } from "../helper/cookies";
import {
  authSuccessHandler,
  logout,
} from "../screens/Login/services/loginAction";
import { postMethod } from "../helper/api";
import API_URL_CONSTANTS from "../constants/apiUrlConstants";

export const authMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (typeof action === "function") {
      if (checkIsTokenExpires()) {
        // Normally we should call our token generation api by passing refresh token
        console.log("getState().loginReducer", getState().loginReducer);
        if (!getState().loginReducer.tokenPromise) {
          return refreshToken(dispatch).then((result) => {
            if (result) {
              next(action);
            }
          });
        } else {
          return getState().loginReducer.tokenPromise.then((result) => {
            if (result) {
              next(action);
            }
          });
        }
      } else {
        next(action);
      }
    } else {
      next(action);
    }
  };

const refreshToken = async (dispatch) => {
  var freshTokenPromise = postMethod(`${API_URL_CONSTANTS.AUTH_LOGIN}`, {
    email: "bruno@email.com",
    password: "bruno",
  })
    .then((authResponse) => {
      let { status, data } = authResponse;
      if (status == 200 && data && data.access_token) {
        authSuccessHandler(dispatch, data);
        dispatch({
          type: "REFRESHING_TOKEN",
          freshTokenPromise: false,
        });
        return true;
      } else {
        if (authResponse.status === 401) {
          logout();
        }
        return false;
      }
    })
    .catch(() => {
      return false;
    });

  dispatch({
    type: "REFRESHING_TOKEN",
    freshTokenPromise: true,
  });

  return freshTokenPromise;
};

const checkIsTokenExpires = () => {
  let currentTime = new Date(Date.now()).getTime().valueOf() + 1000;
  let expireTime = getCookies("EXPIRY_TIME");
  //   console.log("==>", currentTime, expireTime, currentTime > expireTime);
  if (currentTime > expireTime) {
    return true;
  }
  return false;
};
