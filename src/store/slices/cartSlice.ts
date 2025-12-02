import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  addToCartDB,
  connectToDatabase,
  createTables,
  getCartItemsDB,
  removeCartItemDB,
  updateCartQtyDB,
} from "../../storage/data" ;

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  video?: string;
  description: string;
  highlights?: string[];
  specifications?: Record<string, any>;
  careInstructions?: string;
  warranty?: string;
  deliveryInfo?: string;
  ratings?: number;
  tags?: string[];
}

export interface CartItem extends Product {
  qty: number;
}
export interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = { items: [], loading: false };

export const loadCart = createAsyncThunk<CartItem[]>(
  "cart/loadCart",
  async () => {
    const db = await connectToDatabase();
    await createTables(db);
    return await getCartItemsDB(db);
  }
);

export const addToCart = createAsyncThunk<
  CartItem,
  { product: Product; qty: number }
>("cart/addToCart", async ({ product, qty }) => {
  const db = await connectToDatabase();
  await addToCartDB(db, product, qty);

  return { ...product, qty };
});


// Remove product from cart
export const removeFromCart = createAsyncThunk<number, number>(
  "cart/removeFromCart",
  async (id) => {
    const db = await connectToDatabase();
    await removeCartItemDB(db, id);
    return id;
  }
);

// Update quantity
export const updateQty = createAsyncThunk(
  "cart/updateQty", 
  async ({ id, qty }: { id: number; qty: number }) => {
  const db = await connectToDatabase();
  await updateCartQtyDB(db, id, qty);
  return { id, qty };
});


const cartSlice2 = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Load cart
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )

      // Add item
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existing = state.items.find((i) => i.id === newItem.id);

        if (existing) {
          existing.qty += newItem.qty;
        } else {
          state.items.push(newItem);
        }
      })

      // Remove item
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((i) => i.id !== id);
      })

      // Update qty
      .addCase(updateQty.fulfilled, (state, action) => {
        const { id, qty } = action.payload;
        const item = state.items.find((i) => i.id === id);
        if (item) item.qty = qty;
      });
  },
});

// export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice2.reducer;
