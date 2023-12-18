import { makeStyles } from "@mui/styles";

const useStyleDrawer = makeStyles((theme) => ({
  settypomobile: {
    fontSize: "20px !important",
    fontFamily: " Poppins, sans-serif !important",
    [theme.breakpoints.down("md")]: {
      fontSize: "18px !important",
    },
  },

  setavatrhandle: {
    display: "flex !important",
    justifyContent: "center !important",
  },
  setheaderavtar: {
    height: "75px !important",
    marginTop: "15px !important",
    marginBottom: "15px !important",
  },
  setType: {
    fontSize: "20px",
    color: "white",
    justifyContent: "center",
    display: "flex",
    padding: "10px 10px",
  },
  setTypeLogout: {
    fontSize: "20px",
    color: "white",
    justifyContent:"left",
    display: "flex",
    padding: "10px 10px",
    position: "absolute",
    alignItems:'center',
    bottom: "10px",
    width: "100%",
    justifyContent: 'center',
    cursor:'pointer',
    background: 'linear-gradient(45deg, black, transparent)'
  },
  mainDiv: {
    display: "flex",
    alignItems: "center",
  },
  selectedindex: {
    paddingTop: "2px !important",
    paddingBottom:"0px !important",
    "& .Mui-selected": {
      backgroundColor: "rgb(43 123 203 / 45%) !important",
      borderRadius: "0 25px 25px 0",
      borderLeft: "4px solid #00BFA5",
      "&:hover": {
        backgroundColor: "rgb(43 123 203 / 45%) !important",
      },
    },
    // .css-h4y409-MuiList-root
  },
  effectlist: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255,.1) !important",
      borderRadius: "0 25px 25px 0",
    },
  },
  setsidebaricon: {
    color: "white",
    paddingLeft: "15px",
    "&:hover": {
      color: "white",
    },
  },
}));

export default useStyleDrawer;
