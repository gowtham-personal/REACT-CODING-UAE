import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { logout } from "../../Login/services/loginAction";
import SearchIcon from "@material-ui/icons/Search";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import BookIcon from "@material-ui/icons/Book";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNyHomeDetails } from "../../NyTimes/services/nyTimesAction";

const SideBar = ({ state, setParentState }) => {
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

  return (
    <Drawer
      anchor="left"
      open={state.openSideBar}
      onClose={() => setParentState({ openSideBar: false })}
    >
      <div
        className="side-bar-list"
        role="presentation"
        onClick={() => setParentState({ openSideBar: false })}
        onKeyDown={() => setParentState({ openSideBar: false })}
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
                {text.route === "/search" ? <SearchIcon /> : <BookIcon />}
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
  );
};

export default SideBar;
