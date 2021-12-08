import { combineReducers } from "redux";
import nyTimesReducer from "../screens/NyTimes/services/nyTimesReducer";
import headerReducer from "../screens/Header/services/headerReducer";

/**
 * REDUCER to club all state of the application and act as central state
 */
const rootReducer = combineReducers({
  nyTimesReducer,
  headerReducer,
});
export default rootReducer;
