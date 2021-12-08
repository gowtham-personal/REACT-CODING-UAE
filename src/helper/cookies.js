import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookies = (key) => {
  return cookies.get(key);
};

export const setCookies = (key, value, expireTime) => {
  cookies.set(key, value, { path: "/", expires: expireTime });
};

export const removeCookies = (key) => {
  cookies.remove(key);
};
