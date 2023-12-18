import React from "react";
import Container from "@mui/material/Container";
import { Typography_h4 } from "./Typography";
import makeStyles from "@mui/styles/makeStyles";
import { LinkButton } from "./Button";
import { useLocation } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "30px !important",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "80px",
    overflow: "hidden",
  },
  
  setpageheading: {
    width: "100% !important",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))
const CommonContainer = React.memo(({ destination, heading, children, btnName, btnreq }) => {
  const classes = useStyle();

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <div className={classes.setpageheading}>
          <Typography_h4 data={heading} />
          {btnreq === true &&
            <LinkButton destination={destination} btnName={btnName} />
          }
        </div>
        {children}
      </Container>
    </>
  );
});

export default CommonContainer;