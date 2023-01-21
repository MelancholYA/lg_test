import { useAppSelector } from "../app/hooks";
import cartIcon from "../assets/cart-shopping.svg";
import CartProductCard from "./CartProductCard";

type Props = {};

function Cart(props: Props) {
  const { products } = useAppSelector((state) => state.cart);
  const allProducts = useAppSelector((state) => state.products.products);

  const getProductQuantity = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product ? product : 0;
  };

  let discounts = products.reduce((acc, curr) => acc + curr.discount, 0);
  let subtotal = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return (
    <div className="cart">
      <h1 style={{ marginBottom: 10 }}>
        Cart
        <img
          style={{ marginLeft: 15 }}
          width={25}
          src={cartIcon}
          alt=""
        />
      </h1>
      {!products.length ? (
        <h3 className="productCard">Your cart is empty</h3>
      ) : (
        <>
          {allProducts.map((product) => {
            const prod = getProductQuantity(product.id);
            if (!prod) return null;
            return (
              <CartProductCard
                key={product.id}
                data={{
                  ...product,
                  quantity: prod.quantity,
                  discount: prod.discount,
                }}
              />
            );
          })}

          <div className="result">
            <h4>discount </h4>
            <p>£ {discounts.toFixed(2)}</p>
          </div>
          <div className="result">
            <h4>subtotal </h4>
            <p>£ {subtotal.toFixed(2)}</p>
          </div>
          <div className="result">
            <h4>total</h4>
            <p>£ {(subtotal - discounts).toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
