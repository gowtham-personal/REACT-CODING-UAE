import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { logout } from "../../Login/services/loginAction";
import { useHistory } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const UserMenuMobile = ({ state, setParentState }) => {
  let history = useHistory();
  const handleMenuClose = () => {
    setParentState({ openUserMenuMobile: false });
  };
  return (
    <Menu
      anchorEl={state.openUserMenuMobile}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={state.openUserMenuMobile}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/search")}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <SearchIcon />
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => logout({ history })}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <InboxIcon />
        </IconButton>
        <p>logout</p>
      </MenuItem>
    </Menu>
  );
};

export default UserMenuMobile;
