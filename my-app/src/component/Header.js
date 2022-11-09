import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
// import App from "../App";
// import LaundryBin from "../pages/laundrybin";
import Closet from "../pages/closet";
import Home from "../pages/home";
import HomeDashboard from "../pages/HomeDashboard";

function Header(props) {
  const userId = props.userId;
  const setUserId = props.setUserId
  return (
    <>
      <Navbar userId = {userId} setUserId = {setUserId}/>
      <Routes>
        <Route path="/" element={Home({userId: userId, setUserId: setUserId})} />
        <Route
          path="/closet"
          element={Closet({userId: userId})}
        />
        <Route
          path="/homeDashboard"
          element={HomeDashboard({userId: userId})}
        />
        {/* <Route path="/faq" element={LaundryBin} /> */}
      </Routes>
    </>
  );
}

export default Header;
