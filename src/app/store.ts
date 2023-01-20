import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../features/ProductsSlice";
import cartReducer from "../features/CartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
