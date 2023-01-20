import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartProduct {
  id: string;
  quantity: number;
  price: number;
  discount: number;
}

interface ProductState {
  products: ICartProduct[];
}

interface AddProductBody {
  productId: string;
  price: number;
}

const initialState: ProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddProductBody>) => {
      const { price, productId } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity++;
        return;
      }
      state.products.push({ id: productId, price, quantity: 1, discount: 0 });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const { payload: productId } = action;
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (existingProductIndex !== -1) {
        const product = state.products[existingProductIndex];
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          state.products.splice(existingProductIndex, 1);
        }
      }
    },
    calculateDiscount: (state) => {
      let newState = state.products.map((product, index, arr) => {
        if (product.id === "milk") {
          let diskount = Math.floor(product.quantity / 4) * product.price;
          if (product.quantity > 3) {
            product.discount = diskount;
          } else if (product.quantity <= 3) {
            product.discount = 0;
          }
        }
        if (product.id === "butter") {
          let bread = arr.find((prod) => prod.id === "bread");
          if (product.quantity >= 2 && bread?.quantity) {
            let discount =
              Math.floor(product.quantity / 2) * (0.5 * bread.price);
            if (discount > bread.quantity * bread.price) {
              return product;
            }
            bread.discount = discount;
          } else if (product.quantity < 2 && bread?.quantity) {
            bread.discount = 0;
          }
        }
        return product;
      });
      state.products = newState;
    },
  },
});

export const { addToCart, calculateDiscount, removeFromCart } =
  productsSlice.actions;

export default productsSlice.reducer;
