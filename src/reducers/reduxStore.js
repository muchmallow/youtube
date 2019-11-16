import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import loginReducer from "./loginReducer";
import mainReducer from "./mainReducer";

const reducers = combineReducers({
  loginPage: loginReducer,
  mainPage: mainReducer,
});

const createStoreWithMiddleware = applyMiddleware(
  save({ namespace: "endor" }),
  thunkMiddleware,
)(createStore);
const store = createStoreWithMiddleware(reducers, load({ namespace: "endor" }));
export default store;
