import { combineReducers } from "redux"

import { profileReducer } from "./userReducer"
import cartReducer from "../cartSlice";

const reducers = combineReducers({
  profile: profileReducer,
  cart: cartReducer,
})

export default reducers
