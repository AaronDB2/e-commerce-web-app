import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

// Generator function (saga) that handles fetching of categories data from firestore
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

// Generator function (saga) that handles FETCH_CATEGORIES_START action type
export function* onFetchCategories() {
  // Only takes the latest action type of the same type and cancels previous ones
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Generator function (saga) listens for action types for functions in yield all([...etc])
export function* categoriesSaga() {
  // Waits for all the generator functions in the array to complete
  yield* all([call(onFetchCategories)]);
}
