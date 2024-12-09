import { createStore } from "redux";
import { cartReducer } from "./cartReducer";
import {
  addToCartHandler,
  removeProductHandler,
  totalProductPrice,
} from "./action.js";

const store = createStore(cartReducer);

store.subscribe(() => {
  // console.log(store.getState());
  updateCart();
});

const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 15 },
];

window.addToCart = (productId) => {
  const product = products.find((prod) => prod.id === productId);
  if (product) {
    store.dispatch(addToCartHandler(product));
    store.dispatch(totalProductPrice());
  }
};

window.removeFromCart = (productId) => {
  store.dispatch(removeProductHandler(productId));
  store.dispatch(totalProductPrice());
};

const renderProducts = () => {
  const productsList = document.querySelector("#productsList");

  productsList.innerHTML = products
    .map(
      (product) =>
        `<li class="my-2">
          ${product.name} - ₹${product.price} 
          <button class="btn btn-primary mx-2" onclick="addToCart(${product.id})">Add To Cart</button>
        </li>`
    )
    .join("");
};

const updateCart = () => {
  const totalPrice = document.querySelector("#totalPrice");
  const cart = document.querySelector("#cart");
  const state = store.getState();
  cart.innerHTML =
    state.cartItems.length > 0
      ? state.cartItems
          .map((item) => {
            return `<li class="my-2">
  ${item.name} - ₹${item.price} - quantity: ${item.quantity}
  <button class="btn btn-primary mx-2" onClick="removeFromCart(${item.id})">Remove</button>
</li>`;
          })
          .join("")
      : "Cart is Empty";

  // Display the total price from the Redux state
  totalPrice.innerHTML = `<strong>Total Price: </strong>Rs.${state.total}`;
};

// Initial render of products
renderProducts();

// Initial cart update
updateCart();
