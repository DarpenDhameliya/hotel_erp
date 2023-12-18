import React, { lazy, useState } from "react";
import useStyleAdmin from "./AdminStyle";
import Paper from "@mui/material/Paper";
const CommonContainer = lazy(() => import("../container/ComponentContainer"));


const AdminDeshbord = () => {
  const [active, setActive] = useState(false)
  const classes = useStyleAdmin();
  return (
    <>
      <CommonContainer destination={'/admin/deshbord'} heading={'Deshbord'} btnName={'Add Record'} btnreq={true}>
        <Paper className={classes.setProductpaper} elevation={5}>
          <div>hii Deshbord</div>

        </Paper>
      </CommonContainer>
      {/* <ComponentLoader active={'active'} /> */}
    </>
  );
};

export default AdminDeshbord;
