import { USER_ACTION_TYPES } from "./user.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import {
  UserData,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

// Set current user type
export type SetCurrentUser = Action<USER_ACTION_TYPES.SET_CURRENT_USER>;

// Check user session type
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

// Google sign in start type
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

// Email sign int start
export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

// Sign in success type
export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

// Sign in failed type
export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

// Sign up start type
export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

// Sign up success type
export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInformation }
>;

// Sign up failed type
export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;

// Sign out start type
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

// Sign out success type
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

// Sign out failed type
export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

// Action function that will use the SET_CURRENT_USER action type for the userReducer
export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
});

// Action function that will use the CHECK_USER_SESSION action type for the userReducer
export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

// Action function that will use the GOOGLE_SIGN_IN_START action type for the userReducer
export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

// Action function that will use the EMAIL_SIGN_IN_START action type for the userReducer
export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

// Action function that will use the SIGN_IN_SUCCESS action type for the userReducer
export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

// Action function that will use the SIGN_IN_FAILED action type for the userReducer
export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

// Action function that will use the SIGN_UP_START action type for the userReducer
export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

// Action function that will use the SIGN_UP_SUCCESS action type for the userReducer
export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

// Action function that will use the SIGN_UP_FAILED action type for the userReducer
export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

// Action function that will use the SIGN_OUT_START action type for the userReducer
export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

// Action function that will use the SIGN_OUT_SUCCESS action type for the userReducer
export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

// Action function that will use the SIGN_OUT_FAILED action type for the userReducer
export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
