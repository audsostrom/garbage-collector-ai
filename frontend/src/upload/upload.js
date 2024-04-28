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
import "./upload.css";
import upload from "../assets/upload.svg";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      /**
         const response = await axios.post('/api/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
         */
      const currAnalysisResult = {
         people: "2 people",
         gear: "Gloves",
         priority: "High",
         procedure: "Blah blah",
       };
       
      setAnalysisResult(currAnalysisResult);
    } catch (error) {
      console.error("Error analyzing image:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      {!analysisResult && (
        <div className="upload-container">
          <h2>Image Analyzer</h2>
          <form onSubmit={handleSubmit} className='form'>
            {!selectedFile && (
              <div>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img className="upload-pic" src={upload}></img>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
            {selectedFile && !analysisResult && (
              <div>
                <img
                  className="chosen-pic"
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                />
              </div>
            )}

            <div className='right-header'>
               <div className='upload-header'>Upload a Picture</div>
               <div className='upload-desc'>Using your location and the features of the photo, we’ll analyze the waste and identify the proper cleaning process and tools.</div>
               <button type="submit" disabled={!selectedFile || loading}>
                  Confirm Upload
               </button>

            </div>

          </form>
        </div>
      )}
      {selectedFile && analysisResult && (
        <div className="upload-container">
         <div className="form">
         <img
            className="chosen-pic"
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
          />
         <div className='right-header'>
               <div className='upload-header'>Our Analysis</div>
               <div className='upload-desc'>Looks like this is a proper mess!</div>
               <div>Do you plan on cleaning it?</div>
               <div>
               <button>Yes!</button>
               <button>No.</button>

               </div>


            </div>

         </div>
         
          <div>
          <h3>Analysis Result:</h3>
          <div>People Needed: {analysisResult.people}</div>
          <div>Gear Needed: {analysisResult.gear}</div>
          <div>Priority Level: {analysisResult.priority}</div>
          <div>Necessary Procedure: {analysisResult.procedure}</div>
        </div>
        </div>
      )}
      {loading && <p>Loading...</p>}
   
    </div>
  );
};

export default Upload;
