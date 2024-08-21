import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducer/authReducer";
import sheetsReducer from "./reducer/sheetsReducer";
import cartReducer from "./reducer/cartReducer";
import userReducer from "./reducer/userReducer";

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  sheets: sheetsReducer,
  cart: cartReducer,
  user: userReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
