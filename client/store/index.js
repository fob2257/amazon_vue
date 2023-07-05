export const state = () => ({
  cart: [],
  cartLength: 0,
  shipment: { estimated: '', price: 0 },
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
  removeProductFromCart({ commit }, product) {
    commit('filterProductFromCart', product);
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
  changeProductQty(state, { idx, quantity }) {
    state.cart[idx].quantity = quantity;
  },
  filterProductFromCart(state, product) {
    state.cart = state.cart.filter(({ _id }) => _id !== product._id);
  },
  setShipment(state, shipment) {
    state.shipment = { ...shipment };
  },
  clearCart(state) {
    state.cart = [];
    state.cartLength = 0;
    state.shipment = { estimated: '', price: 0 };
  },
};

export const getters = {
  getCartLength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  },
  getCartTotalPrice(state) {
    return state.cart.reduce(
      (prevVal, product) => prevVal + product.price * product.quantity,
      0
    );
  },
  getShipment(state) {
    return state.shipment;
  },
};
