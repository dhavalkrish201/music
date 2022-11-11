import { rootRef } from "../../firebase";
export const GET_PLAYLIST_START = "GET_PLAYLIST_START";
export const GET_PLAYLIST_SUCCESS = "GET_PLAYLIST_SUCCESS";
export const GET_PLAYLIST_FAIL = "GET_PLAYLIST_FAIL";

export const DELETE_PLAYLIST_START = "DELETE_PLAYLIST_START";
export const DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS";
export const DELETE_PLAYLIST_FAIL = "DELETE_PLAYLIST_FAIL";

export const ADD_PLAYLIST_START = "ADD_PLAYLIST_START";
export const ADD_PLAYLIST_SUCCESS = "ADD_PLAYLIST_SUCCESS";
export const ADD_PLAYLIST_FAIL = "ADD_PLAYLIST_FAIL";

export const UPDATE_PLAYLIST_START = "UPDATE_PLAYLIST_START";
export const UPDATE_PLAYLIST_SUCCESS = "UPDATE_PLAYLIST_SUCCESS";
export const UPDATE_PLAYLIST_FAIL = "UPDATE_PLAYLIST_FAIL";

export const ADD_SONG_PLAYLIST = "ADD_SONG_PLAYLIST";
export const UPDATE_SONG_PLAYLIST = "UPDATE_SONG_PLAYLIST";
export const DELETE_SONG_PLAYLIST = "DELETE_SONG_PLAYLIST";

export const ADD_PLAYLIST = "ADD_PLAYLIST";
export const FETCH_PLAYLIST = "FETCH_PLAYLIST";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";

const getPlaylistStart = () => ({
  type: "GET_PLAYLIST_START",
});

const getPlaylistSuccess = (playlist) => ({
  type: "GET_PLAYLIST_SUCCESS",
  payload: playlist,
});

const getPlaylistFail = () => ({
  type: "GET_PLAYLIST_FAIL",
});

const deletePlaylistStart = () => ({
  type: "DELETE_PLAYLIST_START",
});

const deletePlaylistSuccess = () => ({
  type: "DELETE_PLAYLIST_SUCCESS",
});

const deletePlaylistFail = () => ({
  type: "DELETE_PLAYLIST_FAIL",
});

const addPlaylistStart = () => ({
  type: "ADD_PLAYLIST_START",
});

const addPlaylistSuccess = () => ({
  type: "ADD_PLAYLIST_SUCCESS",
});

const addPlaylistFail = () => ({
  type: "ADD_PLAYLIST_FAIL",
});

const updatePlaylistStart = () => ({
  type: "UPDATE_PLAYLIST_START",
});

const updatePlaylistSuccess = () => ({
  type: "UPDATE_PLAYLIST_SUCCESS",
});

const updatePlaylistFail = () => ({
  type: "UPDATE_PLAYLIST_FAIL",
});

const addPlaylistSong = () => ({
  type: "ADD_SONG_PLAYLIST",
});

const updatePlaylistSuccessSong = (playlist) => ({
  type: "UPDATE_SONG_PLAYLIST",
  payload: playlist,
});

const deletePlaylistFailSong = () => ({
  type: "DELETE_SONG_PLAYLIST",
});

// const addPlaylist = (usersongs) => ({
//   type: "ADD_PLAYLIST",
//   payload: usersongs,
// });

// const fetchPlaylist = (usersongs) => ({
//   type: "FETCH_PLAYLIST",
//   payload: usersongs,
//   loading: false,
// });

// const updatePlaylist = (user) => ({
//   type: "UPDATE_PLAYLIST",
//   payload: user,
// });

// const deletePlaylist = (usersongs) => ({
//   type: "DELETE_PLAYLIST",
//   payload: usersongs,
// });

// const songsFail = (error) => ({
//   type: "SONG_FAIL",
//   payload: error,
// });

// export const songInitiate = () => async (dispatch, action) => {
//   try {
//     let res = await db.collection("SongsDetails").get();
//     console.log("res", res);
//     dispatch(fetchSongs());
//   } catch (error) {
//     console.log("error", error);
//     dispatch(songsFail());
//   }
// };

// export const addInitiate = (project) => {
//   return (dispatch, { getFireStore }) => {
//     const firestore = getFireStore();
//     firestore
//       .collection("SongsDetails")
//       .add({
//         ...project,
//         song: "Ram",
//         singer: "Sonu Nigam",
//         music: "javed ali",
//         lyrics: "dhaval",
//         movie: "Jay shree krishna",
//       })
//       .then(() => {
//         dispatch(addSongs(project));
//       })
//       .catch((error) => {
//         dispatch(songsFail(error));
//       });
//   };
// };

export const getPlaylistInitiate = () => {
  return function (dispatch) {
    dispatch(getPlaylistStart());
    rootRef.child("playlist").on("value", (snapshot) => {
      try {
        if (snapshot.val() !== null) {
          dispatch(getPlaylistSuccess(snapshot.val()));
        } else {
          dispatch(getPlaylistSuccess({}));
        }
      } catch (error) {
        dispatch(getPlaylistFail(error));
      }
    });
  };
};

export const deletePlaylistInitiate = (id) => {
  return function (dispatch) {
    dispatch(deletePlaylistStart());
    rootRef.child(`playlist/${id}`).remove((err) => {
      dispatch(deletePlaylistSuccess());
      if (err) {
        dispatch(deletePlaylistFail(err));
      }
    });
  };
};

export const addNewPlaylist = (newplaylist) => {
  return function (dispatch) {
    dispatch(addPlaylistStart());
    rootRef.child("playlist").push(newplaylist, (error) => {
      dispatch(addPlaylistSuccess());
      if (error) {
        dispatch(addPlaylistFail(error));
      }
    });
  };
};

export const addSongPlaylist = (newplaylist) => {
  return function (dispatch) {
    dispatch(addPlaylistSong());
    rootRef.child("playlist").push(newplaylist, (error) => {
      dispatch(updatePlaylistSuccessSong());
      if (error) {
        dispatch(deletePlaylistFailSong(error));
      }
    });
  };
};

export const editPlaylist = (editplaylist, id) => {
  return function (dispatch) {
    dispatch(updatePlaylistStart());
    rootRef.child(`playlist/${id}`).set(editplaylist, (error) => {
      dispatch(updatePlaylistSuccess());
      if (error) {
        dispatch(updatePlaylistFail(error));
      }
    });
  };
};

// export const createSongs = (id) => {
//   return function (dispatch) {
//     dispatch(deleteSongsStart());
//     rootRef.child("songs").push();
//   };
// };
