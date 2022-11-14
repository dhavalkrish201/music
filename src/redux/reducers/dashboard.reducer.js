const initialState = {
  songs: [],
  loading: false,
  error: null,
  playlist: [],
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SONGS_START":
      return {
        ...state,
        loading: true,
      };

    case "GET_SONGS_SUCCESS":
      const songs = [...state.songs];
      songs.push(action.payload);
      state.songs = songs;
      return {
        ...state,
        loading: false,
      };

    case "GET_SONGS_FAIL":
      return {
        ...state,
        loading: false,
        songs: action.payload,
      };

    case "DELETE_SONGS_START":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_SONGS_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "DELETE_SONGS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_SONGS":
      return {
        ...state,
        songs: action.payload,
      };
    case "FETCH_SONGS":
      return {
        ...state,
        songs: action.payload,
      };

    case "UPDATE_SONGS":
      return {
        ...state,
        songs: action.payload,
      };

    case "DELETE_SONGS":
      return {
        ...state,
        loading: true,
      };

    case "ADD_SONGS_START":
      return {
        ...state,
        loading: true,
      };

    case "ADD_SONGS_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "ADD_SONGS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_SONGS_START":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_SONGS_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "UPDATE_SONGS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_SONG_PLAYLIST":
      return {
        ...state,
        loading: true,
        playlist: state.songs.filter(
          (playlist) => playlist.id !== action.payload
        ),
        songs: [action.payload, state.playlist],
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

    default:
      return state;
  }
};

export default songsReducer;
