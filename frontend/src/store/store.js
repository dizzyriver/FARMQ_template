// src/store/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer"; // Import the combined reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
