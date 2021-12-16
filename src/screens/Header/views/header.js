import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { getNyHomeDetails } from "../../NyTimes/services/nyTimesAction";
import { logout } from "../../Login/services/loginAction";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import BookIcon from "@material-ui/icons/Book";
import "./header.scss";

const Header = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const [state, setState] = useState({ openSideBar: false });
  const handleSideBarClose = (route) => {
    setState({ openSideBar: false });
    history.push(route);
    let routeParam = route.split("/category/")[1];
    if (routeParam) {
      dispatch(getNyHomeDetails({ newsType: routeParam }));
    }
  };
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
                <Drawer
                  anchor="left"
                  open={state.openSideBar}
                  onClose={() => setState({ openSideBar: false })}
                >
                  <div
                    className="side-bar-list"
                    role="presentation"
                    onClick={() => setState({ openSideBar: false })}
                    onKeyDown={() => setState({ openSideBar: false })}
                  >
                    <List>
                      {[
                        { name: "World News", route: "/category/world" },
                        { name: "Science News", route: "/category/science" },
                        { name: "Top Stories", route: "/home" },
                        { name: "Search", route: "/search" },
                      ].map((text, index) => (
                        <ListItem
                          button
                          key={text}
                          onClick={() => handleSideBarClose(text.route)}
                        >
                          <ListItemIcon>
                            {text.route === "/search" ? (
                              <SearchIcon />
                            ) : (
                              <BookIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={text.name} />
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                    <List>
                      <ListItem button onClick={() => logout({ history })}>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </div>
                </Drawer>
              )}
              <Typography
                onClick={() => history.push("/home")}
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
