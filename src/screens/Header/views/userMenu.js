import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { logout } from "../../Login/services/loginAction";
import { useHistory } from "react-router-dom";

const UserMenu = ({ state, setParentState }) => {
  let history = useHistory();
  const handleMenuClose = () => {
    setParentState({ openUserMenu: false });
  };
  return (
    <Menu
      anchorEl={state.openUserMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={state.openUserMenu}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => logout({ history })}>logout</MenuItem>
    </Menu>
  );
};

export default UserMenu;
