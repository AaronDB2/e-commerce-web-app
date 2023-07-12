import { useContext } from "react";

import { ProductsContext } from "../../contexts/product.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

// Shop component
const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={products.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
