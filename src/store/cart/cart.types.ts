import { CategoryItem } from "../categories/category.types";

// Cart actions types
export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
}

// CartItem type. Adds the quantity to the CategoryItem type
export type CartItem = CategoryItem & {
  quantity: number;
};
