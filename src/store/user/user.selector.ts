import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

// Selector that gets the user state
export const selectUserReducer = (state: RootState): UserState => state.user;

// Selector for currentUser in user state. (uses memoization)
export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
