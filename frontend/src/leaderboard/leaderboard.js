import React, { useState, useEffect } from 'react';
import './leaderboard.css';
import { useLogoutFunction, useRedirectFunctions, withAuthInfo } from '@propelauth/react';
import { Link } from "react-router-dom";
import axios from 'axios';
const usersData = [
  { email: "user1@example.com", name: "Alice", points: 120 },
  { email: "user2@example.com", name: "Bob", points: 90 },
  { email: "user3@example.com", name: "Charlie", points: 150 },
  { email: "user4@example.com", name: "David", points: 80 },
  { email: "user5@example.com", name: "Eve", points: 110 }
];

const Leaderboard = withAuthInfo((props) => {
  const [users, setUsers] = useState([]);

 const [selectedFile, setSelectedFile] = useState(null);
 const [post, setPostResult] = useState(null)


 const config = {
   headers: {
     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdkMjQ4ZjIxLTVhMDYtNGZmMi1hZjU4LTFkM2FjNjY0ZTRhNSJ9.eyJzdWIiOiI0MGM2YTVjYi0xOTZjLTRiYmYtYjk2NS1mMGMxNmRjNDkwMmYiLCJpYXQiOjE3MTQyODg4NzksImV4cCI6MTcxNDM3NTI3OSwidXNlcl9pZCI6IjQwYzZhNWNiLTE5NmMtNGJiZi1iOTY1LWYwYzE2ZGM0OTAyZiIsImlzcyI6Imh0dHBzOi8vNDc3MzA0Mi5wcm9wZWxhdXRodGVzdC5jb20iLCJlbWFpbCI6ImNnYXdhbmRlMTJAZ21haWwuY29tIiwib3JnX2lkX3RvX29yZ19tZW1iZXJfaW5mbyI6e319.eXRhczwmfnZkqLIKsPuETjn_-eJrcSyIoVhdqgnHi2pWavOk5I5rmJSdlCbAhtx1BLpamtADYpo1Khdhsi2xi_nj1rsHRmwZzMC7xiQkn2mz9sHjbF4SOqkRu3qQypEEVMZuIWBKYRRhMugzYYkCWiq2U04d5riGDbVumOuA8GhEmofA-0bMuetY2LP06xm6bGAOSQI-KFUIeawoLL9PPjoKn5a9x7oR-9L0pGMVRGrDmWnwU-dB3sDz_vIbce1digH2ag-ZUq8WUiELryqNtXPIxiH4W9BddvemHzpeLGWEzBEGYyIUAF7w1JRqSNUvYaI2Li8VK6-55yCdXEhD_w'
   }
 };

 useEffect(() => {
   axios.get(`http://127.0.0.1:8000/rewards`, config)
   .then(response => {
     console.log("response from server", response.data);
     setUsers(response.data);
   })
   .catch(error => {
     console.error('Error uploading image:', error);
   });
 }, []);


  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ol class="leaderboard-items">
        {users.map((user, index) => (
          <li className="leaderboard-item" key={index}>
            <b>{user.username}</b> ({user.points} points)
          </li>
        ))}
      </ol>
      <div className="leaderboard-bottom">
         <div className='leaderboard-you'>You: {props.user.email} (80 pts)</div>
         <Link to='/map'>
            <button className='leaderboard-button'>Go find places to raise your points</button>
         </Link>
      </div>
    </div>
  );
});

export default Leaderboard;
