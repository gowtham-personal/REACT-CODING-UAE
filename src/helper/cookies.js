import Cookies from "universal-cookie";

const cookies = new Cookies();
/**
 * To Get cookies
 * @param {*} key
 * @returns
 */
export const getCookies = (key) => {
  return cookies.get(key);
};

/**
 * To set cookies with expiry time
 * @param {*} key
 * @param {*} value
 * @param {*} minutes
 */
export const setCookies = (key, value, minutes) => {
  if (minutes) {
    cookies.set(key, value, { path: "/", expires: getExpireTime(minutes) });
  } else {
    cookies.set(key, value, { path: "/" });
  }
};

/**
 *
 * @param {To remove cookies} key
 */
export const removeCookies = (key) => {
  cookies.remove(key);
};

/**
 * To set expiry time
 * @param {*} minutes
 * @returns
 */
const getExpireTime = (minutes) => {
  let expireTime = new Date(Date.now() + minutes * 60000);
  cookies.set("EXPIRY_TIME", expireTime.getTime().valueOf(), {
    path: "/",
  });
  return expireTime;
};
