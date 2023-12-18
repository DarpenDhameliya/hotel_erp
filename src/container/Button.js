import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  setproductbtn: {
    fontWeight: 600,
    textTransform: "none",
    padding: "0px 15px",
    height: "40px",
    backgroundColor: "#3c8dbc !important",
    marginLeft: '5px !important',
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
  },
  setnormalbtn: {
    fontWeight: 600,
    width: '200px !important',
    textTransform: "none",
    height: "40px",
    marginLeft: '5px !important',
    color: "white",
    backgroundColor: "#367fa9 !important",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      marginTop: '10px !important',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '10px !important',
    },
  },
  kitchenbtn: {
    fontWeight: 600,
    width: '150px !important',
    textTransform: "none",
    height: "40px",
    marginLeft: '5px !important',
    color: "#367fa9 !important",
    backgroundColor: 'white !important',
    marginTop: '30px !important',
  border: '1px solid #367fa9 !important',
  "&:hover": { backgroundColor: "#3c8dbc !important" , color:'white !important' },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    marginTop: '30px !important',
  },

}
}));

export const LinkButton = React.memo(({ destination, btnName }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.setproductbtn}
      component={Link}
      to={destination}
    >
      {btnName}
    </Button>
  )
})

export const NormalButton = React.memo(({ btnName, clickbtn }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.setnormalbtn}
      onClick={clickbtn}
    >
      {btnName}
    </Button>
  )
})

export const KitchenButton = React.memo(({ btnName, clickbtn }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.kitchenbtn}
      onClick={clickbtn}
    >
      {btnName}
    </Button>
  )
})
