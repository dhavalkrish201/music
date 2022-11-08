import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserRoute from "./components/UserRoute";
import { useDispatch } from "react-redux";
import Protected from "./components/UserRoute";
import { auth } from "./firebase";
import { setUser } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route exact path="/" element={<UserRoute component={Dashboard} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

//<Route exact path="/dashboard" element={<Dashboard />} />
