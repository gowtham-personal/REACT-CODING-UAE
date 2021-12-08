import API_URL_CONSTANTS from "../../../constants/apiUrlConstants";
import { getMethod } from "../../../helper/api";

export const emitEventToReducer = (params) => ({
  type: params.type,
  payload: params.payload,
});

/**
 * Action Creator to call resource api and store result in store
 * @param {*} params
 * @returns
 */
export const loginOrRegister = (params) => async (dispatch) => {
  try {
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
      dispatch(
        emitEventToReducer({
          type: "STORE_SEARCHED_RESOURCE",
          payload: modifiedArticles,
        })
      );
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
