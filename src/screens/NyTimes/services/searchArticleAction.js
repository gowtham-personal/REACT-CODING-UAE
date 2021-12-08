import API_URL_CONSTANTS from "../../../constants/apiUrlConstants";
import { getMethod } from "../../../helper/api";
import { persistStoriesWithHash } from "./nyTimesAction";

export const emitEventToReducer = (params) => ({
  type: params.type,
  payload: params.payload,
});

/**
 * Action Creator to call article api and store result in store
 * @param {*} params
 * @returns
 */
export const getSearchedArticles = (params) => async (dispatch) => {
  try {
    dispatch(
      emitEventToReducer({
        type: "START_LOADER",
        payload: true,
      })
    );
    let searchResponse = await getMethod(
      `${API_URL_CONSTANTS.FETCH_SEARCHED_ARTICLE}?q=${params.searchKey}`
    );
    console.log("searchResponse", searchResponse);
    if (
      searchResponse &&
      searchResponse.status == 200 &&
      searchResponse.data.response.docs
    ) {
      let searchedArticles = searchResponse.data.response.docs;
      let modifiedArticles = persistStoriesWithHash(searchedArticles);
      dispatch(
        emitEventToReducer({
          type: "STORE_SEARCHED_RESOURCE",
          payload: modifiedArticles,
        })
      );
      dispatch(
        emitEventToReducer({
          type: "START_LOADER",
          payload: false,
        })
      );
      persistSearchHistory(params);
    }
  } catch (error) {
    console.log("error", error);
    dispatch(
      emitEventToReducer({
        type: "LOAD_WEB_RESOURCE_FAILURE",
        payload: error.message,
      })
    );
  }
};

/**
 * Logic to persist user search history
 * @param {*} params
 */
const persistSearchHistory = (params) => {
  let searchHistory = localStorage.getItem("SEARCH_HISTORY")
    ? JSON.parse(localStorage.getItem("SEARCH_HISTORY"))
    : [];
  let searchKeyObj = {
    id: searchHistory.length + 1,
    name: params.searchKey,
  };
  searchHistory.push(searchKeyObj);
  if (searchHistory.length > 5) {
    searchHistory.shift();
  }
  localStorage.setItem("SEARCH_HISTORY", JSON.stringify(searchHistory));
};
