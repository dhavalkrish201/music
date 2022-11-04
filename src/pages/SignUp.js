import React from "react";
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

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { orange, pink } from "@mui/material/colors";

const SignUp = () => {
  const Hello = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Built with love by the "}
        <Link color="inherit" href="https://material-ui.com/">
          Material-UI
        </Link>
        {" team."}
      </Typography>
    );
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="mypaper">
          <Avatar className="myavatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="primary" component="h1" variant="h5">
            Sign up
          </Typography>

          <form className="myform" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  //inputProps={{style: { color: "white", borderColor: "white" }}}
                  autoFocus
                  //InputLabelProps={{ className: "myfield" }}
                  multiline={true}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
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
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">
                  <h6>Already have an account? Sign in</h6>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Hello />
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
