import React, {useState, useEffect} from "react";
import "./App.css";
import badge  from './badges/badge.png';
import badge2  from './badges/badge2.png';
import badge3  from './badges/badge3.png';
import badge4  from './badges/badge4.png';

function Shop(props){
  const id = props.id
  const [purchased, setPurchase] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    const response = await fetch("http://127.0.0.1:8000/info/?" + new URLSearchParams({
    user_id:id
  }));
    const data = await response.json();
    console.log(data)
    setPurchase(data)
  }

  function purchase(badgeID){
    function purchased(){
      console.log(badgeID)
    }
    return purchased
  }

  return (
    <div className="Shop" id="Shop">
      <h1>Shop</h1>
        <img src={badge} height="150" onClick={purchase("1")}/>
        <img src={badge2} height="150" />
        <img src={badge3} height="150" />
        <img src={badge4} height="150" />
    </div>

  );
}

export default Shop;
