import React from "react";
import Typography from "@mui/material/Typography";
import useStyleOrder from "./OrderStyle";
import Paper from "@mui/material/Paper";
import { lazy } from "react";
const CommonContainer = lazy(() => import("../../container/ComponentContainer"));

function OrderReport() {
  const classes = useStyleOrder();

  return (
    <>
      <CommonContainer>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Typography>hi</Typography>
        </Paper>
      </CommonContainer>
      {/* <ComponentLoader active={active} /> */}
    </>
  );
}

export default OrderReport;
