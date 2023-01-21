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

const calculateMilkDiscount = (product: ICartProduct) => {
  let discount = Math.floor(product.quantity / 4) * product.price;
  product.discount = product.quantity > 3 ? discount : 0;
};

const calculateBreadDiscount = (
  product: ICartProduct,
  products: ICartProduct[]
) => {
  let bread = products.find((prod) => prod.id === "bread");
  if (!bread) {
    return;
  }
  if (product.quantity < 2) {
    bread.discount = 0;
    return;
  }
  let discountTimes = Math.floor(product.quantity / 2);
  let totalDiscountForBread = 0;
  for (let i = 0; i < bread.quantity; i++) {
    if (i < discountTimes) {
      totalDiscountForBread += 0.5;
    }
  }
  bread.discount = totalDiscountForBread;
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
      state.products.forEach((product, index, products) => {
        switch (product.id) {
          case "milk":
            calculateMilkDiscount(product);
            break;
          case "butter":
            calculateBreadDiscount(product, products);
            break;
        }
      });
    },
  },
});

export const { addToCart, calculateDiscount, removeFromCart } =
  productsSlice.actions;

export default productsSlice.reducer;
