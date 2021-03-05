import React, { Component } from "react";
import "./App.css";
// import { Link } from "react-router-dom";
import { Link } from 'react-scroll';

function Nav(props){
  const linkStyle = {
    color: "white"
  };

  return (
    // <nav>
    //   <ul className="nav-links">
    //     <Link to="/">
    //       <li>Dashboard</li>
    //     </Link>
    //     <Link style={linkStyle} to="/Analytics">
    //       <li>Analytics</li>
    //     </Link>
    //     <Link style={linkStyle} to="/Shop">
    //       <li>Shop</li>
    //     </Link>
    //     <Link style={linkStyle} to="/Settings">
    //       <li>Settings</li>
    //     </Link>
    //   </ul>
    // </nav>
    <nav>
        <div className="nav-links">
        <Link
          activeClass="active"
          to="Dashboard"
          spy={true}
          smooth={true}
          offset={-120}
          duration={500}
          id="nav-link"
        > Dashboard </Link>
        <Link
          activeClass="active"
          to="Analytics"
          spy={true}
          smooth={true}
          offset={-120}
          duration={500}
          id="nav-link"
        > Analytics </Link>
        <Link
          activeClass="active"
          to="Shop"
          spy={true}
          smooth={true}
          offset={-120}
          duration={500}
          id="nav-link"
        > Shop </Link>
        <Link
          activeClass="active"
          to="Settings"
          spy={true}
          smooth={true}
          offset={-120}
          duration={500}
          id="nav-link"
        > Settings </Link>


    </div>
      <p id="total_balance">Total Coins: <span id ="coins">{props.balance}</span></p>
    </nav>

  );
}

export default Nav;
