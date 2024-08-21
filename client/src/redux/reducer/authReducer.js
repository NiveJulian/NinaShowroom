import { LOGIN_WITH_GOOGLE, AUTHENTICATE_USER_FROM_SESSION  } from "../actions/actions";

const initialState = {
  user: {},
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_WITH_GOOGLE:
      return { ...state, isAuth: true, user: payload };

    case AUTHENTICATE_USER_FROM_SESSION:
      return { ...state, isAuth: true, user: payload };
    default:
      return state;
  }
};

export default authReducer;
