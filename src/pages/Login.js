import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleGoogleSignIn = () => {};
  const handleFBSignIn = () => {};
  const handleChange = () => {};

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="mypaper">
          <Avatar className="myavatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="primary" component="h1" variant="h5">
            Login
          </Typography>
          <div className="social-login">
            <button className="btn google-btn social-btn" type="button">
              {" "}
              <span>
                <i className="fab fa-google-plus-g"> Sign with google+</i>
              </span>
            </button>
            <button className="btn facebook-btn social-btn" type="button">
              {" "}
              <span>
                <i className="fab fa-facebook-f"> Sign with facebook</i>
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mysubmit"
              onClick={() => {}}
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
            <Link to="/signup">
              <h6>Don't have an account</h6>
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
