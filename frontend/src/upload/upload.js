import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from '@mui/material';
import './upload.css';

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
      <div className='upload-container'>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile || loading}>
          Analyze
        </button>
      </form>
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
