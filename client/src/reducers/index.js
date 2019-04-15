import { combineReducers } from "redux";

import { startPageReducer } from "./startPage";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  startPage: startPageReducer,
  user: userReducer
});
