import {
  authSuccessHandler,
  logout,
} from "../screens/Login/services/loginAction";
import { postMethod } from "../helper/api";
import API_URL_CONSTANTS from "../constants/apiUrlConstants";

export const generateRefreshToken = async (dispatch) => {
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
          payload: false,
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
    payload: freshTokenPromise,
  });

  return freshTokenPromise;
};
