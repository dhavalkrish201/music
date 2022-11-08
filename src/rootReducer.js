import { combineReducers } from "redux";
import userReducer from "./redux/reducer";
import songsReducer from "./redux/reducers/dashboard.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  usersongs: songsReducer,
});

export default rootReducer;
