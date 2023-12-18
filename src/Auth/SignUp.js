import React, { useEffect, useMemo, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import useStyleAuth from "./AuthStyle";
import Textfield from "../container/TextField";
import ErrorField from "../container/ErrorField";
import Lable from "../container/Lable";
import { useSocket } from "../context/SocketContext";
import CommonContainer from "../container/ComponentContainer";
import { NormalButton } from "../container/Button";
import { SuccessAlert } from "../container/Alert";
const ariaLabel = { "aria-label": "description" };

const SignUp = () => {
  const [passvisible, setPassvisible] = useState(false);
  const [conpassword, setConpassword] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState({});
  const [conpassvisible, setConpassvisible] = useState(false);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const socket = useSocket();
  const classes = useStyleAuth();
  const history = useNavigate();

  const handleClickShowPassword = () => {
    setPassvisible(!passvisible);
  };

  const handleClickShowconPassword = () => {
    setConpassvisible(!conpassvisible);
  };

  const idhandler = (e) => {
    setUserid(e.target.value);
  };
  const namehandler = (e) => {
    setName(e.target.value);
  };
  const passwordhandler = (e) => {
    setConpassword(e.target.value);
  };


  useEffect(() => {
    if (!socket) return;

    socket.on("signup_responce", handleSuccessResponse);

    return () => {
      socket.off("signup_success_response", handleSuccessResponse);
    };
  }, [socket]);

  const handleSuccessResponse = (response) => {
    console.log(response); // Handle the success response
    if (response.status === "success") {
      setSuccessMsg(true);
      setName("");
      setUserid("");
      setPassword("");
      setActive("");
      setType("");
      setConpassword("");
      setTimeout(() => {
        setSuccessMsg(false)
      }, 2000);
    } else {
      setSuccessMsg(false);
      setDbFetcherr(response.error);
      setTimeout(() => {
        setDbFetcherr("");
      }, 3000);
    }
  };
  const handlelogin = (e) => {
    if (
      password !== conpassword ||
      !name ||
      !password ||
      !userid ||
      !active ||
      !type
    ) {
      setError((prevError) => ({
        ...prevError,
        id: !userid ? "Required" : "",
        password: !password ? "Required" : "",
        conpassword: !conpassword
          ? "Required"
          : password !== conpassword
            ? "New password & confirm password different"
            : "",
        name: !name ? "Required" : "",
        status: !active ? "Required" : "",
        type: !type ? "Required" : "",
      }));

      setTimeout(() => setError({}), 3000);
    } else {
      if (socket) {
        socket.emit("new_user_create", {
          name,
          userid,
          password,
          status: active,
          type,
        });
      }
    }
  };
  const memoizedSuccessAlert = useMemo(() => <SuccessAlert message={"Create Success"} />, []);


  return (
    <>
      <CommonContainer heading={'Create User'} btnName={'Add Record'} btnreq={false}>
        {successMsg && memoizedSuccessAlert}
        <Paper className={classes.setProductpaper} elevation={5}>
          {dbFetcherr && <ErrorField error={dbFetcherr} />}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div className={classes.setinput}>
                <Lable lable={"Name"} />

                <Textfield
                  value={name}
                  onchange={namehandler}
                  placeholder="name"
                />
                {error.name && <ErrorField error={error.name} />}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div className={classes.setinput}>
                <Lable lable={"User Id"} />

                <Textfield
                  value={userid}
                  onchange={idhandler}
                  placeholder="user id"
                />
                {error.id && <ErrorField error={error.id} />}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div className={classes.setinput}>
                <Lable lable={"Password"} />

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
                        // aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      // InputProps={ariaLabel}
                      >
                        {passvisible ? (
                          <i
                            className="fas fa-eye-slash"
                            style={{ fontSize: "20px" }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-eye"
                            style={{ fontSize: "20px" }}
                          ></i>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.password && <ErrorField error={error.password} />}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div className={classes.setinput}>
                <Lable lable={"Confirm Password"} />
                {/* <OutlinedInput
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
                        {conpassvisible ? (
                          <i
                            className="fas fa-eye-slash"
                            style={{ fontSize: "20px" }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-eye"
                            style={{ fontSize: "20px" }}
                          ></i>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                /> */}
                <Textfield
                  value={conpassword}
                  onchange={passwordhandler}
                  placeholder="Password"
                  type={'password'}
                />
                {error.conpassword && <ErrorField error={error.conpassword} />}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div className={classes.setinput}>
                <Lable lable={"Type"} />

                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  style={{ marginLeft: "10px" }}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio className={classes.setStyleredio} />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="kitchen"
                    control={<Radio className={classes.setStyleredio} />}
                    label="Kitchen"
                  />
                  <FormControlLabel
                    value="service"
                    control={<Radio className={classes.setStyleredio} />}
                    label="Service"
                  />
                </RadioGroup>
                {error.type && <ErrorField error={error.type} />}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div className={classes.setinput}>
                <Lable lable={"active"} />
                <RadioGroup
                  style={{ marginLeft: "10px" }}
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio className={classes.setStyleredio} />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="deactive"
                    control={<Radio className={classes.setStyleredio} />}
                    label="Deactive"
                  />
                </RadioGroup>
                {error.status && <ErrorField error={error.status} />}
              </div>
            </Grid>
          </Grid>

          {/* <Button
            variant="contained"
            className={classes.setloginbutton}
            onClick={handlelogin}
          >

          </Button> */}
          <div style={{ display: "flex", justifyContent: 'end', marginTop: "10px" }}>
            <NormalButton btnName={'Sign Up'} clickbtn={handlelogin} />
          </div>
        </Paper>
      </CommonContainer>
    </>
  );
};

export default SignUp;
