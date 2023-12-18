import React from "react";
import makeStyles  from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  setlabel: {
    display: "flex",
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
  },
});
// const Lable = ({ lable }) => {
const Lable = React.memo(({ lable }) => {
  const classes = useStyles();

  return <label className={classes.setlabel}>{lable} :</label>;
});

export default Lable;
