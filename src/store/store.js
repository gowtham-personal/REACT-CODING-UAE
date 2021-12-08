import { createStore, applyMiddleware } from "redux";
import rootReducer from "../store/reducerManager";
import thunk from "redux-thunk";
import { authMiddleware } from "./authMiddleware";

let middlewares = [authMiddleware, thunk];

/**
 * used create a store
 */
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
