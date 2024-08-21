import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAN_CART,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  UPDATE_CART,
  GET_SALES,
  GET_SALE_BY_ID,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
} from "../actions/actions";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  sales: [],
  saleInfo: [],
  cartSent: false,
  cartError: null,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let updatedCartItems;
  let existingProductIndex;

  switch (type) {
    case ADD_TO_CART:
      existingProductIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      if (existingProductIndex >= 0) {
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingProductIndex
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...payload, cantidad: 1 }];
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case REMOVE_FROM_CART:
      updatedCartItems = state.cartItems.filter((item) => item.id !== payload);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case UPDATE_CART_ITEM_QUANTITY:
      updatedCartItems = state.cartItems.map((item) =>
        item.id === payload.productId
          ? { ...item, cantidad: payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id),
      };

    case DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        cartError: action.error,
      };

    case CLEAN_CART:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartItems: [],
      };

    case UPDATE_CART:
      return {
        ...state,
        cartItems: action.payload.cartProducts,
      };

    case GET_SALES:
      return {
        ...state,
        sales: payload,
      };

    case GET_SALE_BY_ID:
      return {
        ...state,
        saleInfo: payload,
      };

    case INCREMENT_QUANTITY:
      updatedCartItems = state.cartItems.map((item) =>
        item.id === payload ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case DECREMENT_QUANTITY:
      updatedCartItems = state.cartItems
        .map((item) =>
          item.id === payload && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    default:
      return state;
  }
};

export default cartReducer;
