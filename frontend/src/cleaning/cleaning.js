import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from 'react-router-dom';
import trash from '../assets/dummy-trash.jpeg';
import axios from 'axios';



const Cleaning = () => {
  const { id } = useParams();
   const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [post, setPostResult] = useState(null)

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
  const config = {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdkMjQ4ZjIxLTVhMDYtNGZmMi1hZjU4LTFkM2FjNjY0ZTRhNSJ9.eyJzdWIiOiI0MGM2YTVjYi0xOTZjLTRiYmYtYjk2NS1mMGMxNmRjNDkwMmYiLCJpYXQiOjE3MTQyODg4NzksImV4cCI6MTcxNDM3NTI3OSwidXNlcl9pZCI6IjQwYzZhNWNiLTE5NmMtNGJiZi1iOTY1LWYwYzE2ZGM0OTAyZiIsImlzcyI6Imh0dHBzOi8vNDc3MzA0Mi5wcm9wZWxhdXRodGVzdC5jb20iLCJlbWFpbCI6ImNnYXdhbmRlMTJAZ21haWwuY29tIiwib3JnX2lkX3RvX29yZ19tZW1iZXJfaW5mbyI6e319.eXRhczwmfnZkqLIKsPuETjn_-eJrcSyIoVhdqgnHi2pWavOk5I5rmJSdlCbAhtx1BLpamtADYpo1Khdhsi2xi_nj1rsHRmwZzMC7xiQkn2mz9sHjbF4SOqkRu3qQypEEVMZuIWBKYRRhMugzYYkCWiq2U04d5riGDbVumOuA8GhEmofA-0bMuetY2LP06xm6bGAOSQI-KFUIeawoLL9PPjoKn5a9x7oR-9L0pGMVRGrDmWnwU-dB3sDz_vIbce1digH2ag-ZUq8WUiELryqNtXPIxiH4W9BddvemHzpeLGWEzBEGYyIUAF7w1JRqSNUvYaI2Li8VK6-55yCdXEhD_w'
    }
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/trash-posts/${id}`, config)
    .then(response => {
      console.log("response from server", response.data);
      setPostResult(response.data);
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  }, []);

  return (
    <div>
      <div className="upload-container">
        <h1 className='thank-clean'>Thank you for cleaning!</h1>
        <div className='please-upload'>Be sure to upload an after photo to confirm the area is clear</div>
          <form onSubmit={handleSubmit} className='form-1'>
            <div className='right-header-1'>
               {post && <img className="prev-uploaded-pic" src={post.image_before_url}></img>}
               <div>Before</div>
            </div>
              <div id="right-side-clean-1">
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
               {selectedFile && post && <button>Get +{post.details.reward} Points</button>}
              </div>
            



          </form>
        </div>
   
    </div>
  );
};

export default Cleaning;
