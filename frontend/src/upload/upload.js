import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from '@mui/material';
import './upload.css';
import upload from '../assets/upload.svg';

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
        setAnalysisResult({
            people: '2 people',
            gear: 'Gloves',
            priority: 'High',
            procedure: 'Blah blah'
        });
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
  
      setLoading(false);
    };



   return (
      <div>
      <h2>Image Analyzer</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="file-upload" className="custom-file-upload">
         <img className='upload-pic' src={upload}></img>
        </label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile || loading}>
          Analyze
        </button>
      </form>
      {selectedFile && (
        <div>
          <h3>Selected Image:</h3>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {loading && <p>Loading...</p>}
      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
   );
};

export default Upload;