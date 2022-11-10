const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLAYLIST_START":
      return {
        ...state,
        loading: true,
      };

    case "GET_PLAYLIST_SUCCESS":
      const playlists = [...state.songs];
      playlists.push(action.payload);
      state.playlists = playlists;
      return {
        ...state,
        loading: false,
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
