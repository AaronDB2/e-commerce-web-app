import { USER_ACTION_TYPES } from "./user.types";

// Initial state
const INITIAL_STATE = {
  currentUser: null,
};

// Reducer for user state
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
