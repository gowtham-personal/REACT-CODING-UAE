const INITIAL_STATE = {
  headerTitle: "Top Stories",
  currentLocation: "/",
};

/**
 * central store for resource data
 * @param {*} state
 * @param {*} action
 * @returns
 */
const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: action.payload,
      };
    case "STORE_HEADER_TITLE":
      return {
        ...state,
        headerTitle:
          action.payload == "world"
            ? "World Stories"
            : action.payload == "science"
            ? "Science Stories"
            : "Top Stories",
      };
    default:
      return state;
  }
};
export default headerReducer;
