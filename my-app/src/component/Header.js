import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
// import App from "../App";
// import DailyOutfits from "../pages/dailyoutfits";
// import LaundryBin from "../pages/laundrybin";
import Closet from "../pages/closet";
import Home from "../pages/home";

function Header() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={Home()} />
        {/* <Route path="/dailyoutfits" element={DailyOutfits} /> */}
        <Route
          path="/closet"
          element={Closet({
            clothingItems: [
              {
                name: "American Eagle Sweatpants",
                tags: ["bottom", "cold"],
              },
              {
                name: "Nike Shoes",
                tags: ["shoes", "cold", "warm"],
              },
            ],
          })}
        />
        {/* <Route path="/faq" element={LaundryBin} /> */}
      </Routes>
    </Router>
  );
}

export default Header;
