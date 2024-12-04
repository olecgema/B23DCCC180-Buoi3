// src/redux/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  name: string;
  price: number;
  category: string;
}

interface ProductState {
  products: Product[];
  searchTerm: string;
}

const initialState: ProductState = {
  products: [],
  searchTerm: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<{ index: number; product: Product }>) => {
      state.products[action.payload.index] = action.payload.product;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products.splice(action.payload, 1);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;