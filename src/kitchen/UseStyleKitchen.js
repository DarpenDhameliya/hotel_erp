import makeStyles from "@mui/styles/makeStyles";

const useStyleKitchen = makeStyles((theme) => ({
  setKitchencontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "30px !important",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "30px",
    overflow: "hidden",
  },
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: '0 24px 24px',

    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    // width: "100% !important",
    borderRadius: "10px",
  },
  setLogoutbutton: {
    width: 'fit-content',
    position: 'relative',
    left: '100% ',
    background: "#367fa9 !important",
    color: 'white !important',
    bottom: '15px !important',
    borderRadius: '7px !important',
  },
  setTitlecard: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    margin: "auto",
    width: "100%!important",
  },
  setTitlecard_qty: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    margin: "auto",
    width: "100%!important",
  },
  cardmain: {
    backgroundColor: "#a9a9a914 !important",
    display: "flex",
    justifyContent: "center",
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12) !important',
    "&:hover": {
      "&:hover": { boxShadow: `${theme.shadows[5]}` },
    },
  },
  setcardcontent: {
    padding: "10px !important",
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: '10px !important',
    },
  },
  setcardbtn: {
    display: "flex",
    justifyContent: "center",
  }
}));

export default useStyleKitchen;
