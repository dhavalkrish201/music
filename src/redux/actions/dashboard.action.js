import { rootRef } from "../../firebase";
export const GET_SONGS_START = "GET_SONGS_START";
export const GET_SONGS_SUCCESS = "GET_SONGS_SUCCESS";
export const GET_SONGS_FAIL = "GET_SONGS_FAIL";

export const DELETE_SONGS_START = "DELETE_SONGS_START";
export const DELETE_SONGS_SUCCESS = "DELETE_SONGS_SUCCESS";
export const DELETE_SONGS_FAIL = "DELETE_SONGS_FAIL";

export const ADD_SONGS_START = "ADD_SONGS_START";
export const ADD_SONGS_SUCCESS = "ADD_SONGS_SUCCESS";
export const ADD_SONGS_FAIL = "ADD_SONGS_FAIL";

export const UPDATE_SONGS_START = "UPDATE_SONGS_START";
export const UPDATE_SONGS_SUCCESS = "UPDATE_SONGS_SUCCESS";
export const UPDATE_SONGS_FAIL = "UPDATE_SONGS_FAIL";

const getSongsStart = () => ({
  type: "GET_SONGS_START",
});

const getSongsSuccess = (songs) => ({
  type: "GET_SONGS_SUCCESS",
  payload: songs,
});

const getSongsFail = () => ({
  type: "GET_SONGS_FAIL",
});

const deleteSongsStart = () => ({
  type: "DELETE_SONGS_START",
});

const deleteSongsSuccess = (songs) => ({
  type: "DELETE_SONGS_SUCCESS",
});

const deleteSongsFail = () => ({
  type: "DELETE_SONGS_FAIL",
});

const addSongsStart = (data) => ({
  type: "ADD_SONGS_START",
  payload: data,
});

const addSongsSuccess = () => ({
  type: "ADD_SONGS_SUCCESS",
});

const addSongsFail = () => ({
  type: "ADD_SONGS_FAIL",
});

const updateSongsStart = () => ({
  type: "UPDATE_SONGS_START",
});

const updateSongsSuccess = () => ({
  type: "UPDATE_SONGS_SUCCESS",
});

const updateSongsFail = () => ({
  type: "UPDATE_SONGS_FAIL",
});

export const getSongsInitiate = () => {
  return function (dispatch) {
    dispatch(getSongsStart());
    rootRef.child("songs").on("value", (snapshot) => {
      try {
        if (snapshot.val() !== null) {
          dispatch(getSongsSuccess(snapshot.val()));
        } else {
          dispatch(getSongsSuccess({}));
        }
      } catch (error) {
        dispatch(getSongsFail(error));
      }
    });
  };
};

export const deleteSOngsInitiate = (id) => {
  return function (dispatch) {
    dispatch(deleteSongsStart());
    rootRef.child(`songs/${id}`).remove((err) => {
      dispatch(deleteSongsSuccess());
      if (err) {
        dispatch(deleteSongsFail(err));
      }
    });
  };
};

export const addNewSong = (newsong) => {
  return function (dispatch) {
    dispatch(addSongsStart());
    rootRef.child("songs").push(newsong, (error) => {
      dispatch(addSongsSuccess());
      if (error) {
        dispatch(addSongsFail(error));
      }
    });
  };
};

export const editSongs = (editsong, id) => {
  return (dispatch) => {
    dispatch(updateSongsStart());
    rootRef.child(`songs/${id}`).set(editsong, (error) => {
      dispatch(updateSongsSuccess());
      if (error) {
        dispatch(updateSongsFail(error));
      }
    });
  };
};
