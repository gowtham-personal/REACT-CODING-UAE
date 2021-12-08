import axios from "axios";
import CONFIG_CONSTANTS from "../constants/configConstants";
import { getCookies } from "../helper/cookies";

/**
 * Wrapper for get rest http call
 * @param {*} url
 * @param {*} header
 * @param {*} params
 * @returns
 */
export const getMethod = async (url, header, params) => {
  try {
    const response = await axios({
      method: "get",
      url: `${CONFIG_CONSTANTS.DOMAIN}${url}`,
      params: params,
      headers: header,
    });
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Wrapper for post api call
 * @param {*} url
 * @param {*} requestData
 * @param {*} header
 * @param {*} params
 * @returns
 */
export const postMethod = async (url, requestData, header, params) => {
  try {
    const response = await axios({
      method: "post",
      url: `${CONFIG_CONSTANTS.AUTH_DOMAIN}${url}`,
      data: requestData,
      params: params,
      headers: header,
      // transformRequest: jsonData => transformRequest(jsonData)
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const transformRequest = (jsonData = {}) =>
  Object.entries(jsonData)
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");

axios.defaults.params = {};
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.interceptors.request.use(
  (config) => {
    config.params["api-key"] = getCookies("API_KEY");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
