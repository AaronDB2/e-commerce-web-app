import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

// Generator function (saga) that serves as the root saga for all the other sagas
export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}
