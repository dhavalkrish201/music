const initialState = {
  songs: [],
  loading: false,
  error: null,
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SONGS_START":
    case "UPDATE_SONGS_START":
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
    case "UPDATE_SONGS_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "DELETE_SONGS_FAIL":
    case "UPDATE_SONGS_FAIL":
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

    default:
      return state;
  }
};

export default songsReducer;
