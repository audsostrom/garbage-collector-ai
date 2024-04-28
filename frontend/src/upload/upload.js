import "./upload.css";
import React, { useState } from "react";
import upload from "../assets/upload.svg";
import frog from '../assets/frog-trash.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Upload = () => {
   const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!navigator.geolocation) {
          setError('User location inaccessible');
          return;
      }

      navigator.geolocation.getCurrentPosition(success);
  }, []);

  const success = (position) => {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   setLocation({ latitude, longitude });
};

  const handleClick = () => {
   navigate('/cleaning');
 };


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
               {selectedFile && <button className='upload-confirm' type="submit" disabled={!selectedFile || loading}>
                  Confirm Upload
               </button>}

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
               <div className="user-location">Taken at {location.latitude} {location.longitude}</div>
               <div className="question-cleaning">Do you plan on cleaning it?</div>
               <div className="buttons-bar">
               <button className="yes-button" onClick={handleClick}>Yes!</button>
               <button className="no-button">No.</button>

               </div>


            </div>

         </div>
         
          <div id="statistics">
            <div>
            <h3>Statistics</h3>
            <div>People Needed: {analysisResult.people}</div>
            <div>Gear Needed: {analysisResult.gear}</div>
            <div>Priority Level: {analysisResult.priority}</div>
            <div>Necessary Procedure: {analysisResult.procedure}</div>
            </div>
            <img className='frog-trash' src={frog}></img>
         </div>
        </div>
      )}
      {loading && <p>Loading...</p>}
   
    </div>
  );
};

export default Upload;
