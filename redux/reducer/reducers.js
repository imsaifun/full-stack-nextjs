import { combineReducers } from "redux"

import { profileReducer } from "./userReducer"
import cartReducer from "../cartSlice";
// import authReducer from "../authSlice";

const reducers = combineReducers({
  profile: profileReducer,
  // profile: authReducer,
  cart: cartReducer,
})

export default reducers
