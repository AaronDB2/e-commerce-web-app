import { createSelector } from "reselect";

// Selector that gets the cart state
const selectCartReducer = (state) => state.cart;

// Selector for cartItems from cart state that uses memoization
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// Selector for isCartOpen from cart state that uses memoization
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// Selector for updating the cart count logic that uses memoization
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// Selector for updating the cart total logic that uses memoization
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
