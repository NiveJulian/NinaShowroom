import { GET_ALL_PAYMENT } from "../actions/paymentActions";

const initialState = {
  allPayments: [],
  payment: {},
  paymentError: false,
};

const paymentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PAYMENT:
        return{
            ...state,
            allPayments: payload
        }
    default:
      return state;
  }
};

export default paymentReducer;
