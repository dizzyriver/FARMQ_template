// src/store/store.js
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Correct the import to use named export
import rootReducer from "./reducers/rootReducer"; // Updated import path

// Enhancing createStore with Redux DevTools and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk) // Apply Redux Thunk middleware
  )
);

export default store;
