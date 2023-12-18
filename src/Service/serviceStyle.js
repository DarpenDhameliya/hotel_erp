import makeStyles from "@mui/styles/makeStyles";

const useStyleService = makeStyles((theme) => ({

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
}));

export default useStyleService;
