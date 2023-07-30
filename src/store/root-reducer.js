import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

// Combines multiple reducers to form the root reducer
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
