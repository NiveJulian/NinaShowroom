export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
export const CART_SENT_FAILURE = "CART_SENT_FAILURE";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILURE = "GET_CART_FAILURE";
export const CLEAN_CART = "CLEAN_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_FAILURE = "DELETE_CART_ITEM_FAILURE";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";



//CARRITO
export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
  });
  
  export const incrementQuantity = (productId) => ({
    type: INCREMENT_QUANTITY,
    payload: productId,
  });
  
  export const decrementQuantity = (productId) => ({
    type: DECREMENT_QUANTITY,
    payload: productId,
  });
  
  export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
  
  export const cleanCart = () => ({
    type: CLEAN_CART,
  });
  
  export const updateCartItemQuantity = (productId, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { productId, quantity },
  });
  
  export const updateCart = (updatedCart) => ({
    type: UPDATE_CART,
    payload: updatedCart,
  });