import { createContext, useState } from "react";

//Cart value to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

// Wrapper for accessing cart context
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
