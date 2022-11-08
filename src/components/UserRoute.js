import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

// function Protected(props) {
//   const { Component } = props;
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state) => state.user);
//   useEffect(() => {
//     let login = localStorage.getItem("login");

//     if (!login) {
//       navigate("/login");
//     }
//   });

//   return <Component />;
// }

// export default Protected;

const UserRoute = ({ childern, component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Component {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
