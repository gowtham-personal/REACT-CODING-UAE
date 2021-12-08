/**
 * To support config for dev, sandbox,production and stage
 */
const CONFIG_CONSTANTS = {
  DOMAIN: "https://api.nytimes.com",
  AUTH_DOMAIN: "http:localhost:8000",
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export default CONFIG_CONSTANTS;
