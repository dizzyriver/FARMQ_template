//src/store/reducers/rootReducer.js
import { combineReducers } from "redux";

// Define a placeholder reducer
const placeholderReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Combine all reducers (currently just one)
const rootReducer = combineReducers({
  placeholder: placeholderReducer,
});

export default rootReducer;
