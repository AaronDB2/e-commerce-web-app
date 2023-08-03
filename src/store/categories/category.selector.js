import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// Selector for categories that uses memoization
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Selector for categories in categories state. (uses memoization)
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
