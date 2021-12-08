const INITIAL_STATE = {
  nyHomeResources: [],
  searchedResource: [],
  errorMessage: undefined,
  isLoading: false,
};

/**
 * central store for resource data
 * @param {*} state
 * @param {*} action
 * @returns
 */
const nyTimesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "STORE_NY_HOME_RESOURCE":
      return {
        ...state,
        nyHomeResources: action.payload,
      };
    case "STORE_SEARCHED_RESOURCE":
      return {
        ...state,
        searchedResource: action.payload,
      };
    case "START_LOADER":
      return {
        ...state,
        searchedResource: action.payload ? [] : state.searchedResource,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
export default nyTimesReducer;
