import { useAppDispatch } from "../app/hooks";
import {
  addToCart,
  calculateDiscount,
  removeFromCart,
} from "../features/CartSlice";
import { IProduct } from "../features/ProductsSlice";

interface cartProduct extends IProduct {
  quantity: number;
  discount?: number;
}

type Props = {
  data: cartProduct;
};

function CartProductCard({ data }: Props) {
  const dispatch = useAppDispatch();

  const handleChange = (type: number) => {
    type === 1
      ? dispatch(addToCart({ price: data.price, productId: data.id }))
      : dispatch(removeFromCart(data.id));
    dispatch(calculateDiscount());
  };

  return (
    <div className="cartItem">
      <img
        className="cartItem_picture"
        src={data.picture}
        alt={data.name}
      />
      <div className="productCard_data_main">
        <h5 style={{ marginBottom: 20 }}>{data.name}</h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          quantity :
          <button
            className="cartItem_btn"
            onClick={() => handleChange(-1)}
          >
            -
          </button>
          <b>{data.quantity}</b>
          <button
            className="cartItem_btn"
            onClick={() => handleChange(1)}
          >
            +
          </button>
        </div>
      </div>
      <div>
        {data.discount ? (
          <h3 className="discount">£ {data.discount.toFixed(2)}</h3>
        ) : null}
        <h3>£ {(data.price * data.quantity).toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default CartProductCard;
