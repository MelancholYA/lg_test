import { createSlice } from "@reduxjs/toolkit";
import bread from "../assets/bread.jpg";
import milk from "../assets/milk.jpg";
import butter from "../assets/butter.jpg";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  rating: number;
  picture: string;
  price: number;
}
export interface productState {
  products: IProduct[];
}

const initialState: productState = {
  products: [
    {
      id: "bread",
      description:
        "freshly baked, and airy texture traditional baguette loaves.",
      name: "Whole french bread",
      picture: bread,
      price: 1.0,
      rating: 4.5,
    },
    {
      id: "milk",
      description:
        "Experience the pure Swiss milk, straight from the farms to your doorstep",
      name: "fresh suiss milk",
      picture: milk,
      price: 1.15,
      rating: 4.5,
    },
    {
      id: "butter",
      description:
        "Enhance your cooking and baking with our high-quality,  made from the freshest milk",
      name: "butter",
      picture: butter,
      price: 0.8,
      rating: 4.5,
    },
  ],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
