

import React, { useState, useEffect } from "react";
import { Container, TextField, Button, InputAdornment, IconButton, OutlinedInput, Typography, Paper, Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useStyleAuth from "./AuthStyle";
import Textfield from "../container/TextField";
import ErrorField from "../container/ErrorField";
const ariaLabel = { "aria-label": "description" };


const SignUp = () => {
  const [passvisible, setPassvisible] = useState(false);
  const [conpassword, setConpassword] = useState('');
  const [password, setPassword] = useState('');
  const [userid, setUserid] = useState('')
  const [name, setName] = useState('')
  const [active, setActive] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState({})
  const [conpassvisible, setConpassvisible] = useState(false)
  const [dbFetcherr, setDbFetcherr] = useState('');

  const classes = useStyleAuth();
  const history = useNavigate();

  const handleClickShowPassword = () => {
    setPassvisible(!passvisible);
  };

  const handleClickShowconPassword = () => {
    setConpassvisible(!conpassvisible);
  };

  const idhandler = (e) => {
    setUserid(e.target.value)
  }
  const namehandler = (e) => {
    setName(e.target.value)
  }


  const handlelogin = (e) => {
    if (password !== conpassword || !name || !password || !userid || !active || !type) {
      setError((prevError) => ({
        ...prevError,
        id: !userid ? "Required" : "",
        password: !password ? "Required" : "",
        conpassword: !conpassword ? "Required" : password !== conpassword ? "New password & confirm password different" : "",
        name: !name ? "Required" : "",
        status: !active ? "Required" : "",
        type: !type ? "Required" : "",
      }));

      setTimeout(() => setError({}), 3000);
    } else {
      // api
      //   .post("/auth/signup", {
      //     email,
      //     password,
      //   })
      //   .then((result) => {
      //     history.push('/')
      //   })
      //   .catch((err) => {
      //     setDbFetcherr(err.response.data.error);
      //     setTimeout(() => {
      //       setDbFetcherr("");
      //     }, 3000);
      //   });
    }
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
            sstpl
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
                <label className={classes.setlabel}>Name :</label>
                <Textfield value={name} onchange={namehandler} placeholder="name" />
                {error.name && <ErrorField error={error.name} />}
              </div>
            </Grid>

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
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>Confirm Password :</label>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={conpassword}
                  type={conpassvisible ? "text" : "password"}
                  size="small"
                  placeholder="password"
                  onChange={(e) => setConpassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowconPassword}
                        edge="end"
                        InputProps={ariaLabel}
                      >
                        {conpassvisible ? <i className="fas fa-eye-slash" style={{ fontSize: "20px" }}></i> : <i className="fa fa-eye" style={{ fontSize: "20px" }}></i>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.conpassword && <ErrorField error={error.conpassword} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>Type :</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="kitchen" control={<Radio />} label="Kitchen" />
                  <FormControlLabel value="service" control={<Radio />} label="Service" />
                </RadioGroup>
                {error.active &&
                  <ErrorField error={error.active} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>active :</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Active" />
                  <FormControlLabel value="male" control={<Radio />} label="Deactive" />
                </RadioGroup>
                {error.active && <ErrorField error={error.active} />}
              </div>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            className={classes.setloginbutton}
            onClick={handlelogin}
          >
            Sign Up
          </Button>

        </Paper>
      </Container></>
  )
}

export default SignUp
