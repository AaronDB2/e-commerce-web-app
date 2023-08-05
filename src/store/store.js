import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

// Configuration for redux persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// All the middlewares that will run before actions hit the reducers
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

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

// Runs the saga middleware
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
