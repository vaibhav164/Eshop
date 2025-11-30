import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = {
  items: {} 
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      {
        const { product, qty = 1 } = action.payload;
        const existing = state.items[product.id];
        const newQty = existing ? existing.qty + qty : qty;
        return { ...state, items: { ...state.items, [product.id]: { product, qty: newQty } } };
      }
    case 'REMOVE':
      {
        const id = action.payload.id;
        const newItems = { ...state.items };
        delete newItems[id];
        return { ...state, items: newItems };
      }
    case 'INCREMENT':
      {
        const id = action.payload.id;
        const item = state.items[id];
        if (!item) return state;
        return { ...state, items: { ...state.items, [id]: { ...item, qty: item.qty + 1 } } };
      }
    case 'DECREMENT':
      {
        const id = action.payload.id;
        const item = state.items[id];
        if (!item) return state;
        if (item.qty <= 1) {
          const newItems = { ...state.items };
          delete newItems[id];
          return { ...state, items: newItems };
        }
        return { ...state, items: { ...state.items, [id]: { ...item, qty: item.qty - 1 } } };
      }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

// helper selectors
export const cartSelectors = {
  getTotalItems: (state) => Object.values(state.items).reduce((s, it) => s + it.qty, 0),
  getSubtotal: (state) => Object.values(state.items).reduce((s, it) => s + (it.product.price * it.qty), 0)
};
