import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import useStyleDrawer from "./DrawerStyle";
import DrawerData from "./DrawerData";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
let DrawerOpenWidth = 260;

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(null);

  const mobileMenunBoolean = Boolean(mobileMenu);
  const [mobileSidebaropen, setMobileSidebaropen] = useState(false);
  const [userType, setUserType] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const classes = useStyleDrawer();
  const history = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    let type = localStorage.getItem("type");
    setUserType(type);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("logout_responce", (data) => {
      localStorage.removeItem('type')
      localStorage.removeItem("user");
      localStorage.removeItem("name");
      history("/");
    });
    return () => {
      socket.off("logout_responce");
    };
  }, [socket]);

  const handleMobiblenenuClose = () => {
    setMobileMenu(null);
  };

  const handleMobileSidebar = () => {
    setMobileSidebaropen(!mobileSidebaropen);
  };

  const handleopenmenu = (e) => {
    setMobileMenu(e.currentTarget)
  }

  const handleuserprofile = () => {
    history('/admin/signup')
  }

  const handleLogout = () => {
    if (socket) {
      socket.emit("user_logout", localStorage.getItem("user"));
    }
  }
  

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" style={{ background: "#367fa9" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileSidebar}
              sx={{
                marginRight: 3,
              }}
            >
              <i className="fas fa-bars"></i>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className={classes.settypomobile}
            >
              Restaurant
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box className={classes.mobilerightmenu}>
              <IconButton
                size="large"
                onClick={handleopenmenu}
                aria-controls={mobileMenunBoolean ? "Open_Menu" : undefined}
                aria-haspopup="true"
                aria-expanded={mobileMenunBoolean ? "true" : undefined}
                color="inherit"
              >
                <i className='fas fa-user-alt' style={{ fontSize: '20px' }}></i>
              </IconButton>
            </Box>
            {/* end mobile code */}
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { xs: DrawerOpenWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileSidebaropen}
          onClose={handleMobileSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DrawerOpenWidth,
            },
            "& .MuiPaper-root": { backgroundColor: "#222d32" },
          }}
        >
          <span className={classes.setType}>
            {localStorage.getItem("type")?.toUpperCase()}
          </span>
          <Divider
            variant="middle"
            style={{ borderColor: "#ffffff47", marginBottom: "10px" }}
          />
          <DrawerData />
          <span className={classes.setTypeLogout}>
            <i
              className="fa fa-sign-out"
              style={{ marginRight: "10px"}}
              aria-hidden="true"
            ></i>
            {"LOGOUT"}
          </span>
        </Drawer>
      </Box>
      <Menu
        anchorEl={mobileMenu}
        id="Open_Menu"
        open={mobileMenunBoolean}
        onClose={handleMobiblenenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hidden",
            filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))",
            mt: 1.5,

            "& .MuiMenu-list": {
              padding: "5px",
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleuserprofile}>
          <div className={classes.setbox}>Create Account</div>
        </MenuItem>
        <MenuItem onClick={handleLogout} >
          {/* <ExitToAppIcon className={classes.setmobileicon} /> */}
          <div className={classes.setbox}>Logout</div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Sidebar;
