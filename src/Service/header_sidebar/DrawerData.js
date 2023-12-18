import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import useStyleDrawer from "../../Admin/header_sidebar/DrawerStyle";
import { useLocation, Link } from "react-router-dom";

export default function DrawerData() {
  // const [sublistOpenmaster, setSublistOpenmaster] = useState(false);
  // const [sublistOpenreport, setSublistOpenReport] = useState(false);
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const handleOrderClick = (event) => {
  //   setSelectedIndex(0);
  //   setSublistOpenReport(false);
  //   setSublistOpenmaster(false);
  // };
  const location = useLocation();

  const classes = useStyleDrawer();

  return (
    <>
      {/* <h1>hi</h1> */}
      <List className={classes.selectedindex}>
        <ListItemButton
          button
          component={Link}
          to="/service/deshbord"
          selected={"/service/deshbord" === location.pathname}
          // onClick={handleOrderClick}
          className={classes.effectlist}
        >
          <i className="fas fa-bars" style={{ color: "white" }}></i>
          <ListItemText primary="deshbord" className={classes.setsidebaricon} />
        </ListItemButton>
      </List>
      <List className={classes.selectedindex}>
        <ListItemButton
          button
          component={Link}
          to="/admin/deshbord"
          // selected={"/admin/deshbord" === location.pathname}
          // onClick={handleOrderClick}
          className={classes.effectlist}
        >
          <i className="fas fa-bars" style={{ color: "white" }}></i>
          <ListItemText primary="Link" className={classes.setsidebaricon} />
        </ListItemButton>
      </List>
    </>
  );
}
