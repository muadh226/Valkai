import React from "react";
import "./App.css";
import badge  from './badges/badge.png';
import badge2  from './badges/badge2.png';
import badge3  from './badges/badge3.png';
import badge4  from './badges/badge4.png';

function Dashboard(props){
  console.log(props.time_saved%60)

  return (
    <div className="Dashboard" id="Dashboard">
      <h1 id="tag_line"><span id="time_saved">{Math.floor(props.time_saved/60)} hours</span> and <span id="time_saved">{props.time_saved%60} minutes</span> spent today</h1>
      <p id="daily_balance">💰 Daily Coins: <span id="coins">{props.daily_balance} X̶</span></p>
      <p id="badges">Badges <button id="badges-button">Shop</button></p>
      <img src={badge} height="150" />
      <img src={badge2} height="150" />
      <img src={badge3} height="150" />
      <img src={badge4} height="150" />

    </div>

  );
}

export default Dashboard;
