import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from '@mui/material';
import './upload.css';
import upload from '../assets/upload.svg'

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
      formData.append('image', selectedFile);
  
      try {
         /**
         const response = await axios.post('/api/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
         });
         */
        setAnalysisResult(JSON.stringify({
         people: '2 people',
         gear: 'Gloves',
         priority: 'High',
         procedure: 'Blah blah',
     }, null, 2));
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
  
      setLoading(false);
    };



   return (
      <div className='upload-container'>
      {!selectedFile && !analysisResult && <form className='form' onSubmit={handleSubmit}>
         <label for="file-upload" className="custom-file-upload">
            <img className='upload-pic' src={upload}></img>
         </label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange}/>
        <div className='right-header'>
         <div className='upload-header'>Upload a Picture</div>
         <div className='upload-desc'>Using your location and the features of the photo, we’ll analyze the waste and identify the proper cleaning process and tools.</div>
         <button type="submit" disabled={!selectedFile || loading}>
            Confirm Upload
         </button>

        </div>
      </form>}
      {selectedFile && (
        <div>
         <div className='upload-header'>Our Analysis</div>
          <img className='upload-pic' src={URL.createObjectURL(selectedFile)} alt="Selected" />
        </div>
      )}
      {loading && <p>Loading...</p>}
      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <div>{analysisResult.people}</div>
          <div>{analysisResult.gear}</div>
          <div>{analysisResult.procedure}</div>
        </div>
      )}
      </div>
   );
};

export default Upload;
