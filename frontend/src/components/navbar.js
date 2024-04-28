import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import logo from "../assets/recycle.svg";
import menu from "../assets/menu-icon.svg";
import "./navbar.css";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="navbar-container">
      <div className="left-side">
        <div className="logo-name">Trash.ai</div>
        <img className="logo" src={logo}></img>
      </div>
      <button className="right-side">
        <img className="menu" src={menu} />
      </button>
    </div>
  );
};

export default Navbar;
