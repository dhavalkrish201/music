import { combineReducers } from "redux";
import userReducer from "./redux/reducer";
import songsReducer from "./redux/reducers/dashboard.reducer";
import playlistReducer from "./redux/reducers/playlist.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  usersongs: songsReducer,
  myplaylist: playlistReducer,
});

export default rootReducer;
