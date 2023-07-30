import { CATEGORIES_ACTION_TYPES } from "./category.types";

// Initial state
export const CATEGORIES_INITIAL_STATE = {
  categoriesMap: {},
};

// Reducer for categories state
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };
    default:
      return state;
  }
};
