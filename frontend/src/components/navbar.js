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
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="navbar-container">
      <Link to="/">
      <div className="left-side">
        <div className="logo-name">Trash.ai</div>
        <img className="logo" src={logo} alt="logo" />
      </div>
      </Link>
      <button className="right-side" onClick={toggleDrawer}>
        <img className="menu" src={menu} alt="menu" />
      </button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
         sx: {
           width: 300
         }
       }}
      >
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button key="Profile">
              <ListItemText primaryTypographyProps={{fontFamily: 'Lora'}} primary="Profile"/>
            </ListItem>
            <Link to="/upload">
               <ListItem button key="Upload a Picture">
               <ListItemText primaryTypographyProps={{fontFamily: 'Lora'}}  primary="Upload a Picture"/>
               </ListItem>
            </Link>
            <ListItem button key="Waste Map">
              <ListItemText primaryTypographyProps={{fontFamily: 'Lora'}}  primary="Waste Map"/>
            </ListItem>
            <ListItem button key="Leaderboards">
              <ListItemText primaryTypographyProps={{fontFamily: 'Lora'}}  primary="Leaderboards"/>
            </ListItem>
            {/* Add more ListItem components for other menu items */}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
