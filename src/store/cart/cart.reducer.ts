import { AnyAction } from "redux";

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

// Initial state typing
export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

// Initial cart state
export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

// Reducer for cart state
export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
