import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookies = (key) => {
  return cookies.get(key);
};

export const setCookies = (key, value, minutes) => {
  if (minutes) {
    cookies.set(key, value, { path: "/", expires: getExpireTime(minutes) });
  } else {
    cookies.set(key, value, { path: "/" });
  }
};

export const removeCookies = (key) => {
  cookies.remove(key);
};

const getExpireTime = (minutes) => {
  let expireTime = new Date(Date.now() + minutes * 60000);
  // console.log("======>", expireTime.getTime().valueOf());
  cookies.set("EXPIRY_TIME", expireTime.getTime().valueOf(), {
    path: "/",
  });
  return expireTime;
};
