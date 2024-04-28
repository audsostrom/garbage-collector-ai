import GoogleMapReact from 'google-map-react';
import React, { useState } from "react";
import upload from "../assets/upload.svg";
import frog from '../assets/frog-trash.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import trashcanIcon from '../assets/trashcan.svg'
export default function Map(){
  const config = {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdkMjQ4ZjIxLTVhMDYtNGZmMi1hZjU4LTFkM2FjNjY0ZTRhNSJ9.eyJzdWIiOiI0MGM2YTVjYi0xOTZjLTRiYmYtYjk2NS1mMGMxNmRjNDkwMmYiLCJpYXQiOjE3MTQyODg4NzksImV4cCI6MTcxNDM3NTI3OSwidXNlcl9pZCI6IjQwYzZhNWNiLTE5NmMtNGJiZi1iOTY1LWYwYzE2ZGM0OTAyZiIsImlzcyI6Imh0dHBzOi8vNDc3MzA0Mi5wcm9wZWxhdXRodGVzdC5jb20iLCJlbWFpbCI6ImNnYXdhbmRlMTJAZ21haWwuY29tIiwib3JnX2lkX3RvX29yZ19tZW1iZXJfaW5mbyI6e319.eXRhczwmfnZkqLIKsPuETjn_-eJrcSyIoVhdqgnHi2pWavOk5I5rmJSdlCbAhtx1BLpamtADYpo1Khdhsi2xi_nj1rsHRmwZzMC7xiQkn2mz9sHjbF4SOqkRu3qQypEEVMZuIWBKYRRhMugzYYkCWiq2U04d5riGDbVumOuA8GhEmofA-0bMuetY2LP06xm6bGAOSQI-KFUIeawoLL9PPjoKn5a9x7oR-9L0pGMVRGrDmWnwU-dB3sDz_vIbce1digH2ag-ZUq8WUiELryqNtXPIxiH4W9BddvemHzpeLGWEzBEGYyIUAF7w1JRqSNUvYaI2Li8VK6-55yCdXEhD_w'
    }
  };

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [stops, setStops] = useState([]);
   const [error, setError] = useState(null);
   const markers = [{latitude: 38.543770, longitude: -121.761658}, {latitude: 40.543770, longitude: -123.761658}]

    useEffect(() => {
      if (!navigator.geolocation) {
          setError('User location inaccessible');
          return;
      }

      navigator.geolocation.getCurrentPosition(success);
      axios.get(`http://127.0.0.1:8000/locations`, config)
      .then(response => {
        console.log("response from server", response.data);
        setStops(response.data);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }, []);

  const success = (position) => {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   setLocation({ latitude, longitude });
};


  const defaultProps = {
   center: {
      lat: location.latitude,
      lng: location.longitude
   },
   zoom: 15
 };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      {location ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
          center={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          { location &&
               markers.map((stop, index) => (
                  <img src={trashcanIcon}
                     lat={stop.latitude}
                     lng={stop.longitude}
                     width={40}
                     height={40}
                  />

               ))
            }
        </GoogleMapReact>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
}