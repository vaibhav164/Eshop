export const cartSelectors = {
  getTotalItems: (state) =>
    state.reduce((sum, item) => sum + item.qty, 0),

  getSubtotal: (state) =>
    state.reduce((sum, item) => sum + (item.price * item.qty), 0),
};
