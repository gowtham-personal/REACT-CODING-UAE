const INITIAL_STATE = {
  loggedIn: "false",
  accessToken: null,
  tokenPromise: false,
};

/**
 * central store for resource data
 * @param {*} state
 * @param {*} action
 * @returns
 */
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        accessToken: action.payload,
        loggedIn: true,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        loggedIn: false,
      };
    case "REFRESHING_TOKEN":
      return {
        ...state,
        tokenPromise: action.freshTokenPromise,
      };
    default:
      return state;
  }
};
export default loginReducer;
