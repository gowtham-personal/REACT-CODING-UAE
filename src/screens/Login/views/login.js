import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { LoginRegisterHooks } from "../../../customHooks/loginRegisterHooks";
import "./login.scss";

const Login = () => {
  let history = useHistory();
  let [state, onLoginRegister, onFormChange] = LoginRegisterHooks("AUTH_LOGIN");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="Login">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onLoginRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onFormChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={onFormChange}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {state.errorMsg && (
            <Typography component="h6" variant="h6">
              * {state.errorMsg}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => history.push("/signup")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Login;
