import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import Paper from '@mui/material/Paper'
import useStyleKitchen from './UseStyleKitchen'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography_h5, Typography_h5_bold, Typography_h6 } from '../container/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
const LogoutMenu = lazy(() => import('./LogoutMenu'));

const KitechanDeshbord = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useNavigate();
  const socket = useSocket();
  const classes = useStyleKitchen();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    console.log('click')
    if (socket) {
      socket.emit("user_logout", localStorage.getItem("user"));
    }
  }, [anchorEl]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("logout_responce", (data) => {
      localStorage.removeItem('type')
      localStorage.removeItem("user");
      localStorage.removeItem("name");
      history("/");
    });
    return () => {
      socket.off("logout_responce");
    };
  }, [handleLogout]);


  const memoizedCards = useMemo(() => (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'10000'} />
              <Typography_h6 data={'grm'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'500'} />
              <Typography_h6 data={'grm'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'200'} />
              <Typography_h6 data={'grm'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'400'} />
              <Typography_h6 data={'grm'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'5'} />
              <Typography_h6 data={'Qty'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'5'} />
              <Typography_h6 data={'Qty'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={2} >
        <Card className={classes.cardmain}>
          <CardContent className={classes.setcardcontent}>
            <div className={classes.setTitlecard_qty}>
              <Typography_h5_bold data={'5'} />
              <Typography_h6 data={'Qty'} />
            </div>
            <div className={classes.setTitlecard}>
              <Typography_h5 data={'Methi Gota'} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ), []);
  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setKitchencontainer}
      >
        <Paper className={classes.setProductpaper} elevation={5}>
          <IconButton
            onClick={handleClick}
            size="small"
            className={classes.setLogoutbutton}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <i className="fas fa-bars" style={{ fontSize: '20px' }}></i>
          </IconButton>
          {memoizedCards}
        </Paper>
      </Container>
      <LogoutMenu anchorEl={anchorEl} open={open} handleClose={handleClose} handleLogout={handleLogout} />
    </>
  )
}

export default KitechanDeshbord