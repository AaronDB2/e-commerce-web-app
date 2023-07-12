import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

// Product value to access
export const ProductsContext = createContext({
  products: [],
});

// Wrapper for accessing product context
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
