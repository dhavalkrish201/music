import types from "./actionType";
import { auth, googleAuthProvider } from "../firebase";

const signupStart = () => ({
  type: types.SIGNUP_START,
});

const signupSuccess = (user) => ({
  type: types.SIGNUP_SUCCESS,
  payload: user,
});

const signupFail = (error) => ({
  type: types.SIGNUP_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

const googleStart = () => ({
  type: types.GOOGLE_START,
});

const googleSuccess = (user) => ({
  type: types.GOOGLE_SUCCESS,
  payload: user,
});

const googleFail = (error) => ({
  type: types.GOOGLE_FAIL,
  payload: error,
});

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

const signupInitiate = (email, password, firstName) => {
  return function (dispatch) {
    dispatch(signupStart());

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          firstName,
        });
        dispatch(signupSuccess(user));
      })
      .catch((error) => dispatch(signupFail(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};

export const googleInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(googleStart());

    auth
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleSuccess(user));
      })
      .catch((error) => dispatch(googleFail(error.message)));
  };
};

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());

    auth
      .signOut()
      .then((resp) => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};

export default signupInitiate;
