import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Type of the root state (root reducer)
export type RootState = ReturnType<typeof rootReducer>;

// Type for persist config that makes sure that you can only use rootreducer values inside whitelist.
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

// Configuration for redux persist
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// All the middlewares that will run before actions hit the reducers
// const middleWares = [sagaMiddleware].filter(Boolean);

// Code below has problems with importing the logger with typescript. Need to fix this later
// Seems react scripts does not support something like always.
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

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
