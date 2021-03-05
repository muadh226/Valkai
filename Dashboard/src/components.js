import React, {useState, useEffect} from "react";
import "./App.css";
import Nav from "./Nav";
import Analytics from "./Analytics";
import Shop from "./Shop";
import Settings from "./Settings";
import Dashboard from "./Dashboard";
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function Components(){

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('user_id')

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response = await fetch("http://127.0.0.1:8000/info/?" + new URLSearchParams({
    user_id: id
  }));
    const data = await response.json();
    console.log(data)
    setInfo(data)
  }

  return (
    // <Router>
    //   <div className="App">
    //     <Nav />
    //     <Switch>
    //       <Route path="/" exact component={Dashboard} />
    //       <Route path="/Analytics" component={Analytics} />
    //       <Route path="/Shop" component={Shop} />
    //       <Route path="/Settings" component={Settings} />
    //     </Switch>
    //   </div>
    // </Router>
    <div className="Components">
      <Nav balance={info.total_balance+" c"}/>
      <Dashboard time_saved={info.time_saved} daily_balance={info.daily_balance} id={info.id}/>
      <Analytics />
      <Shop id={info.id} />
      <Settings />
    </div>
  );
}

export default Components;
