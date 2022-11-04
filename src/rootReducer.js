import { combineReducers } from "redux";
import userReducer from "./redux/reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
