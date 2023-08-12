// Categories actions types
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "categpry/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "categpry/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "categpry/FETCH_CATEGORIES_FAILED",
}

// CategoryItem type
export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

// Category type
export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

// CategoryMap type
export type CategoryMap = {
  [key: string]: CategoryItem[];
};
