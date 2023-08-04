import { createSelector } from "reselect";

// Selector that gets the categories state
const selectCategoryReducer = (state) => state.categories;

// Selector for categories state that uses memoization
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

// Selector for isLoading in categories state. (uses memoization)
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
