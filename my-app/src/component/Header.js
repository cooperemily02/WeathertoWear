import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
// import App from "../App";
// import LaundryBin from "../pages/laundrybin";
import Closet from "../pages/closet";
import Home from "../pages/home";
import HomeDashboard from "../pages/HomeDashboard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OutfitTemplateForm from "../component/OutfitTemplateForm"
import Laundry from "../pages/laundry";

function Header(props) {
  const user = props.user;
  const setUser = props.setUser;

  return (
    <>
      <Navbar user = {user} setUser = {setUser}/>
      <Routes>
        <Route path="/" element={Home({user: user, setUser: setUser})} />
        <Route
          path="/closet"
          element={Closet({user: user})}
        />
        <Route
          path="/homeDashboard"
          element={HomeDashboard({user: user})}
        />
        <Route
          path="/signUp"
          element={SignUp({user: user, setUser: setUser})}
        />
        <Route
          path="/signin"
          element={SignIn({user: user, setUser: setUser})} 
        />
        <Route
          path="/laundry"
          element={Laundry({user: user})}
        />
        {/* <Route path="/faq" element={LaundryBin} /> */}
        <Route path="/outfit-template-form" element={<OutfitTemplateForm user={user}/>}/>
      </Routes>
    </>
  );
}

export default Header;
