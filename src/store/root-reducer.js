import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

// Combines multiple reducers to form the root reducer
export const rootReducer = combineReducers({
  user: userReducer,
});
