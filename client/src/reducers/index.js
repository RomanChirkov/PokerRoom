import { combineReducers } from "redux";

import { userReducer } from "./user";
import { appReducer } from "./app";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
});
