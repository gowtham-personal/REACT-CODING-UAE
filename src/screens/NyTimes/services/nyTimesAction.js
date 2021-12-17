import API_URL_CONSTANTS from "../../../constants/apiUrlConstants";
import { getMethod } from "../../../helper/api";

export const emitEventToReducer = (params) => ({
  type: params.type,
  payload: params.payload,
});

/**
 * Action Creator to call article api and store result in store
 * @param {*} params
 * @returns
 */
export const getNyHomeDetails = (params) => async (dispatch) => {
  try {
    dispatch(
      emitEventToReducer({
        type: "START_LOADER",
        payload: true,
      })
    );
    let { newsType } = params;
    newsType = newsType ? newsType : "home";
    let nyhomeResponse = await getMethod(
      `${API_URL_CONSTANTS.FETCH_STORIES}/${newsType}.json`
    );
    console.log("nyhomeResponse", nyhomeResponse);
    if (
      nyhomeResponse &&
      nyhomeResponse.status == 200 &&
      nyhomeResponse.data.results
    ) {
      let topStories = nyhomeResponse.data.results;
      dispatch(
        emitEventToReducer({
          type: "STORE_NY_HOME_RESOURCE",
          payload: topStories,
        })
      );
      dispatch(
        emitEventToReducer({
          type: "STORE_HEADER_TITLE",
          payload: newsType,
        })
      );
      persistStoriesWithHash(topStories);
      dispatch(
        emitEventToReducer({
          type: "START_LOADER",
          payload: false,
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
    dispatch(
      emitEventToReducer({
        type: "START_LOADER",
        payload: false,
      })
    );
  }
};

/**
 * To get Comments
 * @param {*} params
 * @returns
 */
export const getArticleComments = (params) => async (dispatch) => {
  try {
    let { url, offset } = params;
    let queryParams = {
      url,
      offset,
    };
    let commentsResponse = await getMethod(
      API_URL_CONSTANTS.FETCH_ARTICLE_COMMENTS,
      {},
      queryParams
    );
    console.log("commentsResponse", commentsResponse);
    if (
      commentsResponse &&
      commentsResponse.status == 200 &&
      commentsResponse.data.results
    ) {
      let topStories = commentsResponse.data.results;
      dispatch(
        emitEventToReducer({
          type: "STORE_COMMENTS_RESOURCE",
          payload: topStories,
        })
      );
      persistStoriesWithHash(topStories);
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
 * To persist stories with hash
 * @param {*} topStories
 * @returns
 */
export const persistStoriesWithHash = (topStories) => {
  let topStoriesObj = {};
  topStories.map((story) => {
    if (story.title == undefined) {
      story.short_url = story._id;
      story.title = story.headline.main;
      story.section = story.section_name;
      story.updated_date = story.pub_date;
      story.byline = story.byline.original;
    }

    let hashKey = getHashFromUrl(story.short_url);
    if (hashKey) {
      topStoriesObj[hashKey] = story;
    }
  });
  localStorage.setItem("STORIES_OBJ", JSON.stringify(topStoriesObj));
  return topStories;
};

/**
 * To get hash from url
 * @param {*} shortUrl
 * @returns
 */
export const getHashFromUrl = (shortUrl) => {
  let hashKey = null;
  if (shortUrl) {
    hashKey = shortUrl.split("//")[1].split("/")[1];
  }
  return hashKey;
};
