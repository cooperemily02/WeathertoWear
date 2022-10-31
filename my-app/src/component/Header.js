import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
// import App from "../App";
// import DailyOutfits from "../pages/dailyoutfits";
// import LaundryBin from "../pages/laundrybin";
import Closet from "../pages/closet";
import Home from "../pages/home";

function Header(props) {
  const userId = props.userId;
  return (
    <Router>
      <Navbar userId = {userId}/>
      <Routes>
        <Route path="/" element={Home({userId: userId})} />
        {/* <Route path="/dailyoutfits" element={DailyOutfits} /> */}
        <Route
          path="/closet"
          element={Closet()}
        />
        {/* <Route path="/faq" element={LaundryBin} /> */}
      </Routes>
    </Router>
  );
}

export default Header;
