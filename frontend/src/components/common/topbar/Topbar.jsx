import React from "react";
import "./topbar.css";
import logo from "../../../assets/icons/favicon.png";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="container flex-between">
        <div className="left flex-start">
          <img src={logo} alt="" />
          <h1 className="dark-text-gradient">Readcity Technologies</h1>
        </div>
        <div className="right">
          <div className="no-user">
            <button className="dark-btn">Learn More</button>
            <button className="light-btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
