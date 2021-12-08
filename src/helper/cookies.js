import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookies = (key) => {
  return cookies.get(key);
};

export const setCookies = (key, value, minutes) => {
  cookies.set(key, value, { path: "/", expires: getExpireTime(minutes) });
};

export const removeCookies = (key) => {
  cookies.remove(key);
};

const getExpireTime = (minutes) => {
  console.log(new Date(Date.now() + 5000));
  if (minutes) {
    minutes = 60;
  }
  return new Date(Date.now() + minutes * 6000);
};
