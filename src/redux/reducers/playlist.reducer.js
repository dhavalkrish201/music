import { values } from "lodash";

const initialState = {
  playlist: [],
  loading: false,
  error: null,
  singleplaylist: {},
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLAYLIST_START":
    case "GET_PLAYLIST_SONG_START":
      return {
        ...state,
        loading: true,
      };

    case "ADD_SONG_PLAYLIST":
      console.log("testnewdata--->", action);
      console.log("Playlist data by shankar--->", values(state.playlist));
      const playlistIndex = state.playlist[action.payload.playlistID];

      return {
        ...state,
      };

    case "GET_PLAYLIST_SUCCESS":
    case "GET_PLAYLIST_SONG_SUCCESS":
      return {
        ...state,
        loading: false,
        playlist: action.payload,
      };

    case "UPDATE_SONG_PLAYLIST":
      return {
        ...state,
        loading: false,
        singleplaylist: action.payload,
      };

    case "DELETE_SONG_PLAYLIST":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_PLAYLIST_FAIL":
      return {
        ...state,
        loading: false,
        songs: action.payload,
      };

    case "DELETE_PLAYLIST_START":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_PLAYLIST_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "DELETE_PLAYLIST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_PLAYLIST":
      return {
        ...state,
        songs: action.payload,
      };
    case "FETCH_PLAYLIST":
      return {
        ...state,
        songs: action.payload,
      };

    case "UPDATE_PLAYLIST":
      return {
        ...state,
        songs: action.payload,
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        loading: true,
      };

    case "ADD_PLAYLIST_START":
      return {
        ...state,
        loading: true,
      };

    case "ADD_PLAYLIST_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "ADD_PLAYLIST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_PLAYLIST_START":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_PLAYLIST_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "UPDATE_PLAYLIST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default playlistReducer;
