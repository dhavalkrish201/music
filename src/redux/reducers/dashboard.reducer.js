const initialState = {
  loading: false,
  songs: [],
  error: null,
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
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
