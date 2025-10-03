import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItemType } from "../../types/cartItem";
import type { RootState } from "../../store";

interface CartState {
  cart: CartItemType[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      const pizzaId = action.payload;
      state.cart = state.cart.filter((c) => c.pizzaId !== pizzaId);
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const pizzaId = action.payload;
      const item = state.cart.find((c) => c.pizzaId === pizzaId);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const pizzaId = action.payload;
      const item = state.cart.find((c) => c.pizzaId === pizzaId);
      if (item) {
        item.quantity = Math.max(0, item.quantity - 1);
        item.totalPrice = item.quantity * item.unitPrice;
      }
      // Remove items with quantity 0
      state.cart = state.cart.filter((c) => c.quantity > 0);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getTotalCartQuantity = (state: RootState): number =>
  state.cart.cart.reduce((sum: number, item: CartItemType) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState): number =>
  state.cart.cart.reduce((sum: number, item: CartItemType) => sum + item.totalPrice, 0);

export const getCart = (state: RootState): CartItemType[] => state.cart.cart;

export const getCurrentQuantityById = (id: number) => (state: RootState): number =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
