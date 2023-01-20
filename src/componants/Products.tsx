import { useAppSelector } from "../app/hooks";
import ProductCard from "./ProductCard";

type Props = {};

function Products(props: Props) {
  const products = useAppSelector((state) => state.products.products);

  return (
    <div className="Products">
      <h1 style={{ marginBottom: 10 }}>Products</h1>
      <div>
        {products.map((product, index) => (
          <ProductCard
            data={product}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
