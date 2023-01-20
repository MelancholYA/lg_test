import { useAppDispatch } from "../app/hooks";
import { addToCart, calculateDiscount } from "../features/CartSlice";
import { IProduct } from "../features/ProductsSlice";
import Rating from "./Rating";

type Props = {
  data: IProduct;
};

function ProductCard({ data }: Props) {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ price: data.price, productId: data.id }));
    dispatch(calculateDiscount());
  };

  return (
    <div className="productCard">
      <div className="productCard_data">
        <img
          className="productCard_data_picture"
          src={data.picture}
          alt={data.name}
        />
        <div className="productCard_data_main">
          <h4 style={{ marginBottom: 10 }}>{data.name}</h4>
          <p>{data.description}</p>
        </div>
        <div>
          <Rating value={data.rating} />
          <h3 style={{ marginTop: 10, textAlign: "right" }}>
            £ {data.price.toFixed(2)}
          </h3>
        </div>
      </div>
      <button
        className="productCard_btn"
        onClick={handleAdd}
      >
        ADD TO CART
      </button>
    </div>
  );
}

export default ProductCard;
