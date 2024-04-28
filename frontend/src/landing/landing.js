import React, { useState } from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import frog from '../assets/frog-landing.svg';
import topCircles from '../assets/upper-circles.svg';
import lowerCircles from '../assets/lower-circles.svg';


const Landing = () => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `upload`;
    navigate(path);
  };

  return (
    <div className="landing-container">
      <div id="left-side-content">
         <div className="landing-text">
         <div className="header">Keep Things Better Than You Found It</div>
         <div className="subheader">We empower communities to tackle litter and create a cleaner, healthier planet. <b></b>Trash.ai is the one-stop app to report, clean up, and prevent litter. Simply take a picture of litter and upload it with your location. Our AI will identify the waste and suggest disposal methods.</div>


         </div>

      </div>
      <div id="right-side-content">
         <img className="frog-logo" src={frog}></img>

         <button id="take-a-pic" onClick={routeChange}>Take a picture of trash!</button>

      </div>
    </div>
  );
};

export default Landing;
