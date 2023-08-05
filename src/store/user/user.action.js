import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Action function that will use the SET_CURRENT_USER action type for the userReducer
export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

// Action function that will use the CHECK_USER_SESSION action type for the userReducer
export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

// Action function that will use the GOOGLE_SIGN_IN_START action type for the userReducer
export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

// Action function that will use the EMAIL_SIGN_IN_START action type for the userReducer
export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

// Action function that will use the SIGN_IN_SUCCESS action type for the userReducer
export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

// Action function that will use the SIGN_IN_FAILED action type for the userReducer
export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

// Action function that will use the SIGN_UP_START action type for the userReducer
export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

// Action function that will use the SIGN_UP_SUCCESS action type for the userReducer
export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

// Action function that will use the SIGN_UP_FAILED action type for the userReducer
export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

// Action function that will use the SIGN_OUT_START action type for the userReducer
export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

// Action function that will use the SIGN_OUT_SUCCESS action type for the userReducer
export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

// Action function that will use the SIGN_OUT_FAILED action type for the userReducer
export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
