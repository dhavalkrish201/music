import "./App.css";

import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserRoute from "./components/UserRoute";
import { useSelector } from "react-redux";
import Protected from "./components/UserRoute";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/dashboard"
        element={<UserRoute element={<Dashboard />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

//<Route exact path="/dashboard" element={<Dashboard />} />
