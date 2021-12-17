import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import SideBar from "./sideBar";
import "./header.scss";

const Header = () => {
  let history = useHistory();
  const [state, setState] = useState({ openSideBar: false });

  let { headerTitle, currentLocation } = useSelector(
    (state) => state.headerReducer
  );
  console.log("currentLocation", currentLocation);
  return (
    <div className="Header">
      {currentLocation.pathname != "/" &&
        currentLocation.pathname != "/signup" && (
          <AppBar position="static">
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
              {state.openSideBar && (
                <SideBar state={state} setParentState={setState} />
              )}
              <Typography
                onClick={() => history.push("/home")}
                variant="h6"
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
                  // onClick={handleProfileMenuOpen}
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
                  // onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        )}
    </div>
  );
};

export default Header;
