import GoogleMapReact from 'google-map-react';
import React, { useState } from "react";
import upload from "../assets/upload.svg";
import frog from '../assets/frog-trash.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map(){


  const [location, setLocation] = useState({ latitude: null, longitude: null });
   const [error, setError] = useState(null);
   const markers = [{latitude: 38.543770, longitude: -121.761658}, {latitude: 40.543770, longitude: -123.761658}]

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
                  <AnyReactComponent
                     lat={stop.latitude}
                     lng={stop.longitude}
                     text="My Marker"
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