import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { logout } from "../../Login/services/loginAction";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import BookIcon from "@mui/icons-material/Book";
import ScienceIcon from "@mui/icons-material/Science";
import PublicIcon from "@mui/icons-material/Public";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNyHomeDetails } from "../../NyTimes/services/nyTimesAction";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const SideBarMobile = ({ state, setParentState }) => {
  let history = useHistory();
  let dispatch = useDispatch();

  const handleSideBarClose = (route) => {
    setParentState({ openSideBar: false });
    history.push(route);
    let routeParam = route.split("/category/")[1];
    if (routeParam) {
      dispatch(getNyHomeDetails({ newsType: routeParam }));
    }
  };

  let { currentLocation } = useSelector((state) => state.headerReducer);

  return (
    <Drawer
      anchor="left"
      open={state.openSideBar}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      variant="temporary"
      onClose={() => setParentState({ openSideBar: false })}
    >
      <div
        className="side-bar-list"
        role="presentation"
        onClick={() => setParentState({ openSideBar: false })}
        onKeyDown={() => setParentState({ openSideBar: false })}
      >
        <List>
          <img
            src="https://m.media-amazon.com/images/I/41StE4eHahL._SY445_.jpg"
            width="240px"
          />
          {[
            {
              name: "World News",
              route: "/category/world",
              icon: <PublicIcon />,
            },
            {
              name: "Science News",
              route: "/category/science",
              icon: <ScienceIcon />,
            },
            { name: "Top Stories", route: "/home", icon: <BookIcon /> },
            { name: "Search", route: "/search", icon: <SearchIcon /> },
          ].map((text, index) => (
            <ListItem
              button
              key={text.name}
              onClick={() => handleSideBarClose(text.route)}
              className={
                text.route == currentLocation.pathname ? "list-button" : ""
              }
            >
              <ListItemIcon>{text.icon}</ListItemIcon>
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
  );
};

export default SideBarMobile;
