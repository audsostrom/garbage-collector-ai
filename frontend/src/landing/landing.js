import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from '@mui/material';
import './landing.css';
import { useNavigate } from "react-router-dom";

const Landing = () => {
   let navigate = useNavigate();

   const routeChange = () =>{ 
      let path = `upload`; 
      navigate(path);
   }

  return (
    <div className='landing-container'>
      <div>Hi</div>
      <button onClick={routeChange}>Take a Picture</button>
    </div>
  );
};

export default Landing;
