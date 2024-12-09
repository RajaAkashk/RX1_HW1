export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CALCULATE_TOTAL = "CALCULATE_TOTAL";

export const addToCartHandler = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const totalProductPrice = () => ({ type: CALCULATE_TOTAL });

export const removeProductHandler = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
