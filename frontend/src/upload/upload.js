import "./upload.css";
import React, { useState } from "react";
import upload from "../assets/upload.svg";
import frog from '../assets/frog-trash.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


const Upload = () => {

   const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [trashId, setTrashId] = useState(null);
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

  const handleYes = () => {
   navigate(`/cleaning/${trashId}`);
 };

 const handleNo = () => {
   navigate('/contact');
 };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
   event.preventDefault();
   if (!selectedFile && !location) return;
 
   setLoading(true);
 
   const formData = new FormData();
   formData.append("latitude", location.latitude);
   formData.append("longitude", location.longitude);
   formData.append("image", selectedFile);
  
   const config = {
     headers: {
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdkMjQ4ZjIxLTVhMDYtNGZmMi1hZjU4LTFkM2FjNjY0ZTRhNSJ9.eyJzdWIiOiI0MGM2YTVjYi0xOTZjLTRiYmYtYjk2NS1mMGMxNmRjNDkwMmYiLCJpYXQiOjE3MTQyODg4NzksImV4cCI6MTcxNDM3NTI3OSwidXNlcl9pZCI6IjQwYzZhNWNiLTE5NmMtNGJiZi1iOTY1LWYwYzE2ZGM0OTAyZiIsImlzcyI6Imh0dHBzOi8vNDc3MzA0Mi5wcm9wZWxhdXRodGVzdC5jb20iLCJlbWFpbCI6ImNnYXdhbmRlMTJAZ21haWwuY29tIiwib3JnX2lkX3RvX29yZ19tZW1iZXJfaW5mbyI6e319.eXRhczwmfnZkqLIKsPuETjn_-eJrcSyIoVhdqgnHi2pWavOk5I5rmJSdlCbAhtx1BLpamtADYpo1Khdhsi2xi_nj1rsHRmwZzMC7xiQkn2mz9sHjbF4SOqkRu3qQypEEVMZuIWBKYRRhMugzYYkCWiq2U04d5riGDbVumOuA8GhEmofA-0bMuetY2LP06xm6bGAOSQI-KFUIeawoLL9PPjoKn5a9x7oR-9L0pGMVRGrDmWnwU-dB3sDz_vIbce1digH2ag-ZUq8WUiELryqNtXPIxiH4W9BddvemHzpeLGWEzBEGYyIUAF7w1JRqSNUvYaI2Li8VK6-55yCdXEhD_w'
     }
   };
 
   try {
     axios.post('http://127.0.0.1:8000/trash-posts/', formData, config).then(response => {
      console.log("response from server", response.data);
      setTrashId(response.data.post_id);
      setAnalysisResult(response.data.gemini_response); // Update the state to trigger TextToSpeech
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      setAnalysisResult(); // Set error message for TTS
    });
    
     
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
               <div className="user-location">Taken at {location.latitude}, {location.longitude}</div>
               <div className="question-cleaning">Do you plan on cleaning it?</div>
               <div className="buttons-bar">
               <button className="yes-button" onClick={handleYes}>Yes!</button>
               <button className="no-button" onClick={handleNo}>No.</button>

               </div>


            </div>

         </div>
         
          <div id="statistics">
            <div>
            <h2>Statistics</h2>
            <div><b>Location Description:</b> {analysisResult.Description}</div>
            <div>
               <b>Nearby Locations:</b> { analysisResult.Nearby_landmarks.map((item, index) => (
                 (index ==  analysisResult.Nearby_landmarks.length - 1 ? (
                  <span>{item.name} ({item.distance})</span>
                 ) : <span>{item.name} ({item.distance}), </span>)


               ))
              }


            </div>
            <div><b>Impact:</b> {analysisResult.impact_level}</div>
            <div><b>Emergency level:</b> {analysisResult.emergency}</div>
            <div><b>Type of waste:</b> {analysisResult.Type_of_waste}</div>
            <div><b>People required to clean:</b> {analysisResult.people_required}</div>
            <div>
               <b>Protective Measures:</b>
               { analysisResult.suggestion["safety precautions"].map((item, index) => (
                 <div>{item}</div>

               ))
              }


            </div>
            <div>
               <b>Procedure For Cleanup:</b> 
               { analysisResult.suggestion.Steps.map((item, index) => (
                 <div>{item}</div>

               ))
              }


            </div>
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
