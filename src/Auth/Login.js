

import React, { useState, useEffect } from "react";
import { Container, TextField, Button, InputAdornment, IconButton, OutlinedInput, Typography, Paper, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useStyleAuth from "./AuthStyle";
import Textfield from "../container/TextField";
import ErrorField from "../container/ErrorField";
const ariaLabel = { "aria-label": "description" };

const Login = () => {
  const [passvisible, setPassvisible] = useState(false);
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState('')
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [error, setError] = useState({})

  const classes = useStyleAuth();
  const history = useNavigate();

  const handleClickShowPassword = () => {
    setPassvisible(!passvisible);
  };

  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      handlelogin();
    }
  };

  const handlelogin = () => {
    if (!userid || !password) {
      setError((prevError) => ({
        ...prevError,
        id: !userid ? "Required" : "",
        password: !password ? "Required" : "",
      }));
      setTimeout(() => {
        setError({})
      }, 3000);
    } else {
      // api
      //   .post("/auth/login", {
      //     userid,
      //     password,
      //   })
      //   .then((result) => {
      //     localStorage.setItem("ssAdmin", result.data.result);
      //     history.push("/app/product");
      //   })
      //   .catch((err) => {
      //     setDbFetcherr(err.response.data.error);
      //     setTimeout(() => {
      //       setDbFetcherr("");
      //     }, 3000);
      //   });
    }
  };
  const idhandler = (e) => {
    setUserid(e.target.value)
  }
  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <div className={classes.setpageheading}>
          <Typography variant="h5" gutterBottom className={classes.setheading}>
            SSTPL
          </Typography>
        </div>

        <Paper className={classes.setloginbackpaper} elevation={5}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.setloginheadset}
          >
            Sign in to start your session
          </Typography>
          {dbFetcherr && <ErrorField error={dbFetcherr} />}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>User Id :</label>
                <Textfield value={userid} onchange={idhandler} placeholder="user id" />
                {error.id && <ErrorField error={error.id} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>Password :</label>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={password}
                  type={passvisible ? "text" : "password"}
                  size="small"
                  placeholder="password"
                  onKeyPress={handlekeypress}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        InputProps={ariaLabel}
                      >
                        {passvisible ? <i className="fas fa-eye-slash" style={{ fontSize: "20px" }}></i> : <i className="fa fa-eye" style={{ fontSize: "20px" }}></i>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.password && <ErrorField error={error.password} />}
              </div>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            className={classes.setloginbutton}
            onClick={handlelogin}
          >
            Login
          </Button>
          <div className={classes.setbottomtypography} >
            <Typography
              variant="body2"
              className={classes.setacctypography}
              gutterBottom
            >
              Don't have an Account ?
            </Typography>
            <Typography
              className={classes.setsignuilink}
              variant="body2"
              noWrap
              component={Link}
              to="/signup"
              color="textPrimary"
              underline="none"
            >
              Sign up.
            </Typography>
          </div>
        </Paper>
      </Container></>
  )
}

export default Login
