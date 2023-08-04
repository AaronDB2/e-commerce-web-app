import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// Configuration for redux persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// All the middlewares that will run before actions hit the reducers
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

// Allow redux devtools extension in chrome to work if installed
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Activate the middlewares
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
