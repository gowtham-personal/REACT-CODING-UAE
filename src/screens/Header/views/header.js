import React, { useState } from "react";
import {
  AppBar,
  MenuItem,
  Menu,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { getNyHomeDetails } from "../../NyTimes/services/nyTimesAction";
import { HeaderStyles } from "./headerStyles";

const Header = () => {
  const classes = HeaderStyles();
  let history = useHistory();
  let dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (route) => {
    setAnchorElNav(null);
    if (route == "logout") {
      history.push("/");
    } else if (route) {
      history.push(`/category/${route}`);
      dispatch(getNyHomeDetails({ newsType: route }));
    }
  };
  let { headerTitle, currentLocation } = useSelector(
    (state) => state.headerReducer
  );
  console.log("currentLocation", currentLocation);
  return (
    <div className={classes.root}>
      {currentLocation.pathname != "/" &&
        currentLocation.pathname != "/signup" && (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    history.push("/");
                    setAnchorElNav(null);
                  }}
                >
                  <Typography textAlign="center">Top Stories</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseNavMenu("world")}>
                  <Typography textAlign="center">World News</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseNavMenu("science")}>
                  <Typography textAlign="center">Science News</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseNavMenu("logout")}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
              <Typography
                onClick={() => history.push("/home")}
                className={classes.title}
                variant="h6"
                noWrap
              >
                {headerTitle}{" "}
              </Typography>
              <div>
                <IconButton
                  aria-label="search"
                  color="inherit"
                  onClick={() => history.push("/search")}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        )}
    </div>
  );
};

export default Header;
