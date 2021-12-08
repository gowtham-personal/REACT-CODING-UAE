import API_URL_CONSTANTS from "../../../constants/apiUrlConstants";
import CONFIG_CONSTANTS from "../../../constants/configConstants";
import { postMethod } from "../../../helper/api";
import { toast } from "react-toastify";
import { setCookies, removeCookies } from "../../../helper/cookies";

export const emitEventToReducer = (params) => ({
  type: params.type,
  payload: params.payload,
});

/**
 * Action Creator to call logi api and store result in store
 * @param {*} params
 * @returns
 */
export const loginOrRegister = (params) => async (dispatch) => {
  try {
    let { email, password } = params;
    let authResponse = await postMethod(`${API_URL_CONSTANTS[params.action]}`, {
      email,
      password,
    });
    console.log("authResponse", authResponse);
    let { status, data } = authResponse;
    if (status == 200 && data && data.access_token) {
      authSuccessHandler(dispatch, data, params);
    } else {
      toast.error(data.message);
      dispatch(
        emitEventToReducer({
          type: "AUTH_FAILURE",
          payload: data.message,
        })
      );
    }
  } catch (error) {
    console.log("error", error);
    dispatch(
      emitEventToReducer({
        type: "AUTH_FAILURE",
        payload: error.message,
      })
    );
  }
};

/**
 * To handle login sucess
 * @param {*} dispatch
 * @param {*} data
 * @param {*} params
 */
export const authSuccessHandler = (dispatch, data, params) => {
  setCookies("ACCESS_TOKEN", data.access_token);
  setCookies(
    "API_KEY",
    CONFIG_CONSTANTS.NY_API_KEY,
    CONFIG_CONSTANTS.TOKEN_EXPIRY_TIME
  );

  dispatch(
    emitEventToReducer({
      type: "AUTH_SUCCESS",
      payload: data.access_token,
    })
  );
  if (params) {
    params.history.push("/home");
    let successMsg =
      params.action == "AUTH_LOGIN"
        ? "Logged In Successfully"
        : "User Registered Successfully";
    toast.success(successMsg);
  }
};

/**
 * For logout
 * @param {*} params
 */
export const logout = (params) => {
  params.history.push("/");
  removeCookies("API_KEY");
  removeCookies("ACCESS_TOKEN");
  removeCookies("EXPIRY_TIME");
};
