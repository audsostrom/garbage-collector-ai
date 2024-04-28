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
import "./cleaning.css";
import upload from "../assets/upload.svg";
import frog from '../assets/frog-trash.svg';
import { useNavigate } from 'react-router-dom';
import trash from '../assets/dummy-trash.jpeg';


const Cleaning = () => {
   const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClick = () => {
   navigate('/cleaning');
 };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    navigate('/leaderboard');

  };

  return (
    <div>
      <div className="upload-container">
          <form onSubmit={handleSubmit} className='form'>
            <div className='right-header'>
               <img className="prev-uploaded-pic" src={trash}></img>
               <div>Before</div>
            </div>
            {!selectedFile && (
              <div id="right-side">
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img className="upload-pic" src={upload}></img>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
               
               <div>After</div>
              </div>
            )}


          </form>
        </div>
   
    </div>
  );
};

export default Cleaning;
