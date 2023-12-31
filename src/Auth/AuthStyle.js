import { makeStyles } from "@mui/styles";

const useStyleAuth = makeStyles((theme) => ({
  setloginbackpaper: {
    textAlign: "center",
    backgroundColor: 'white',
    padding: theme.spacing(3),
    display: "flex !important",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    maxWidth: "510px",
    borderRadius: "10px",
  },
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#0d6efd08",
    paddingTop: "70px",
    // backgroundImage:`url(${image})`
  },
  setpageheading: {
    maxWidth: "100% !important",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },
  setheading: {
    display:'flex',
    padding: "5px",
    margin: "0 !important",
    color: "#495057",
    alignItems: 'center',
    fontSize: "30px !important",
    lineHeight: "32px",
    fontFamily: ["Poppins", "sans-serif", "!important"],
    [theme.breakpoints.down("xs")]: {
      fontSize:'25px !important'
    },  },
  setloginheadset:{
    fontSize:'15px !important',
    color:'#524c4c',
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontWeight: "600 !important",
  },
  setinput:{
    display:'grid',
    marginTop:'12px !important'
  },
  setlabel: {
    display:'flex',
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
   },
  setloginbutton: {
    marginTop: "20px !important",
    backgroundColor: "#367fa9 !important",
  },
  setbottomtypography:{
    display:'flex',
    justifyContent:'flex-end',
    marginTop:'10px'
  },
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    width: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },
  setStyleredio: {
    padding: "3px !important",

  }
}));

export default useStyleAuth;