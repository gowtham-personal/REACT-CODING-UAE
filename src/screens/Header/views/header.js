import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SideBar from "./sideBar";
import SideBarMobile from "./sideBarMobile";
import Box from "@mui/material/Box";
import UserMenu from "./userMenu";
import UserMenuMobile from "./userMenuMobile";

import "./header.scss";

const drawerWidth = 240;

const Header = () => {
  let history = useHistory();
  const [state, setState] = useState({
    openSideBar: false,
    openUserMenu: false,
    openUserMenuMobile: false,
  });

  let { headerTitle, currentLocation } = useSelector(
    (state) => state.headerReducer
  );
  console.log("currentLocation", currentLocation);
  return (
    <>
      {currentLocation.pathname != "/" &&
        currentLocation.pathname != "/signup" && (
          <div className="Header">
            <AppBar
              position="fixed"
              className="nav-header"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  className="side-bar-toggle"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setState({ openSideBar: true })}
                >
                  <MenuIcon />
                </IconButton>

                <Typography
                  onClick={() => history.push("/home")}
                  variant="h5"
                  noWrap
                >
                  {headerTitle}{" "}
                </Typography>
                <div className="user-icons-lg">
                  <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => history.push("/search")}
                  >
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={() => setState({ openUserMenu: true })}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>

                <div className="user-icons-sm">
                  <IconButton
                    aria-label="show more"
                    aria-controls="primary-search-account-menu-mobile"
                    aria-haspopup="true"
                    onClick={() => setState({ openUserMenuMobile: true })}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <SideBarMobile state={state} setParentState={setState} />
              <SideBar />
              <UserMenu state={state} setParentState={setState} />
              <UserMenuMobile state={state} setParentState={setState} />
            </Box>
          </div>
        )}
    </>
  );
};

export default Header;
