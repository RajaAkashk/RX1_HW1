import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./action.js";

const initialState = { cartItems: [], total: 0 };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return { ...state, cartItems: [...state.cartItems] };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case CALCULATE_TOTAL:
      const total = state.cartItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      return {
        ...state,
        total,
      };

    default:
      return state;
  }
};

export { cartReducer, ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL };
