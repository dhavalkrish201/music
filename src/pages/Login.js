import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginInitiate } from "../redux/actions";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const history = useNavigate();

  useEffect(() => {
    if (currentUser) {
      history("/dashboard");
    }
  }, [currentUser, history]);

  const handleGoogleSignIn = () => {};
  const handleFBSignIn = () => {};

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // const login = () => {
  //   localStorage.setItem("login", true);
  //   history("/dashboard");
  // };

  // useEffect(() => {
  //   let login = localStorage.getItem("login");
  //   if (login) {
  //     history("/dashboard");
  //   }
  // });

  const submitLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    dispatch(loginInitiate(email, password));
    setUser({ email: "", password: "" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container component="main" maxWidth="xs" id="logreg-form">
          <CssBaseline />
          <div className="mypaper">
            <Avatar className="myavatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography color="primary" component="h1" variant="h5">
              <Link to="/dashboard">Login</Link>
            </Typography>
            <div className="social-login">
              <button className="btn google-btn social-btn" type="button">
                {" "}
                <span>
                  <i className="fab fa-google-plus-g"> Sign with google+</i>
                </span>
              </button>
            </div>
            <form className="myform" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="mysubmit"
                onClick={submitLogin}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link>
                    <h6>Forgot Password?</h6>
                  </Link>
                </Grid>
              </Grid>
              <hr />
              <Link to="/">
                <h6>Don't have an account</h6>
              </Link>
            </form>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Login;
