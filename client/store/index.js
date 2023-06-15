export const state = () => ({
  cart: [],
  cartLength: 0,
});

export const actions = {
  addProductToCart({ state, commit }, product) {
    const idx = state.cart.findIndex(({ _id }) => _id === product._id);

    if (idx >= 0) {
      const { quantity } = product;
      commit('incrementProductQty', { idx, quantity });
    } else {
      commit('pushProductToCart', product);
    }

    commit('updateCartLength');
  },
};

export const mutations = {
  updateCartLength(state) {
    state.cartLength = state.cart.reduce(
      (prevVal, product) => prevVal + product.quantity,
      0
    );
  },
  pushProductToCart(state, product) {
    state.cart.push(product);
  },
  incrementProductQty(state, { idx, quantity }) {
    state.cart[idx].quantity += quantity;
  },
};
