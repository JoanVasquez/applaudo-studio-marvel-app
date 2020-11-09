import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers/allReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeEnhancers(applyMiddleware(thunk))
);

export default store;
