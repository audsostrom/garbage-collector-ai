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
     'Authorization': 'Bearer ' + props.accessToken
   }
 };

 useEffect(() => {
   axios.get(`http://127.0.0.1:5001/rewards`, config)
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
         <Link to='/map'>
            <button className='leaderboard-button'>Go find places to raise your points</button>
         </Link>
      </div>
    </div>
  );
});

export default Leaderboard;
