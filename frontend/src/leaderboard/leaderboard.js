import React, { useState, useEffect } from 'react';
import './leaderboard.css';
import { useLogoutFunction, useRedirectFunctions, withAuthInfo } from '@propelauth/react';
import { Link } from "react-router-dom";
const usersData = [
  { email: "user1@example.com", name: "Alice", points: 120 },
  { email: "user2@example.com", name: "Bob", points: 90 },
  { email: "user3@example.com", name: "Charlie", points: 150 },
  { email: "user4@example.com", name: "David", points: 80 },
  { email: "user5@example.com", name: "Eve", points: 110 }
];

const Leaderboard = withAuthInfo((props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Sort users by points in descending order
    const sortedUsers = [...usersData].sort((a, b) => b.points - a.points);
    setUsers(sortedUsers);
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ol class="leaderboard-items">
        {users.map((user, index) => (
          <li className="leaderboard-item" key={index}>
            <b>{user.name}</b> ({user.points} points)
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
