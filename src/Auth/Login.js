import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import useStyleAuth from "./AuthStyle";
import { useSocket } from "../context/SocketContext";
import {  SuccessAlertLogin } from "../container/Alert";
const ariaLabel = { "aria-label": "description" };
const Textfield = lazy(() => import("../container/TextField"));
const ErrorField = lazy(() => import("../container/ErrorField"));
const Lable = lazy(() => import("../container/Lable"));

const Login = () => {
  const socket = useSocket();

  const [passvisible, setPassvisible] = useState(false);
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [error, setError] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);
  const classes = useStyleAuth();
  const history = useNavigate();

  useEffect(() => {
    if (!socket) return;
    socket.on("login_responce", handleSuccessResponse);
    return () => {
      socket.off("login_responce", handleSuccessResponse);
    };
  }, [socket]);

  const handleSuccessResponse = useCallback(
    (response) => {
      console.log(response.result);
      if (response.status === "success") {
        setSuccessMsg(true);
        setUserid("");
        setPassword("");
        setTimeout(() => {
          setSuccessMsg(false);
          if (response.result.type === "admin") {
            history("/admin/deshbord");
          } else if (response.result.type === "service") {
            history("/service/deshbord");
          } else {
            history("/kitchen/deshbord");
          }
        }, 1000);
        localStorage.setItem("user", response.result.authToken);
        localStorage.setItem("type", response.result.type);
        localStorage.setItem("name", response.result.name);
      } else {
        setDbFetcherr(response.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      }
    },
    [history]
  );
  const handlekeypress = useCallback((e) => {
    if (e.key === "Enter") {
      handlelogin();
    }
  }, [password]);

  const handlelogin = useCallback(() => {
    console.log()
    if (!userid || !password) {
      setError((prevError) => ({
        ...prevError,
        id: !userid ? "Required" : "",
        password: !password ? "Required" : "",
      }));
      setTimeout(() => {
        setError({});
      }, 3000);
    } else {
      if (socket) {
        socket.emit("user_login", { userid, password });
      }
    }
  }, [socket, userid, password]);

  const memoizedSuccessAlert = useMemo(() => <SuccessAlertLogin message={"Login Success"} />, []);

  return (
    <>
      {/* <Suspense> */}
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        {successMsg && memoizedSuccessAlert}
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
                <Lable lable={"User Id"} />
                <Textfield
                  value={userid}
                  onchange={(e) => setUserid(e.target.value)}
                  placeholder="user id"
                />
                {error.id && <ErrorField error={error.id} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <Lable lable={"Password"} />
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
                        onClick={() => setPassvisible(!passvisible)}
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
          </Grid>

          <Button
            variant="contained"
            className={classes.setloginbutton}
            onClick={handlelogin}
          >
            Login
          </Button>
          <div className={classes.setbottomtypography}>
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
      </Container>
      {/* </Suspense> */}
    </>
  );
};

export default Login;
