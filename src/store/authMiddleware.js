import { getCookies } from "../helper/cookies";
import { generateRefreshToken } from "./generateRefreshToken";
/**
 * Auth middleware to handle oauth
 * @param {*} param0
 * @returns
 */
export const authMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (typeof action === "function") {
      if (checkIsTokenExpires()) {
        // Normally we should call our token generation api by passing refresh token
        console.log("getState().loginReducer", getState().loginReducer);
        if (!getState().loginReducer.tokenPromise) {
          return generateRefreshToken(dispatch).then((result) => {
            if (result) {
              next(action);
            }
          });
        } else {
          if (getState().loginReducer.tokenPromise)
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

const checkIsTokenExpires = () => {
  let currentTime = new Date(Date.now()).getTime().valueOf() + 1000;
  let expireTime = getCookies("EXPIRY_TIME");
  //   console.log("==>", currentTime, expireTime, currentTime > expireTime);
  if (currentTime > expireTime) {
    return true;
  }
  return false;
};
