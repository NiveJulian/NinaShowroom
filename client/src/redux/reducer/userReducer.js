import { CREATED_SELLER, FETCH_USERS } from "../actions/actions";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATED_SELLER:
      return {
        ...state,
      };
    case FETCH_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
