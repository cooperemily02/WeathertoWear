import logo from "./logo.svg";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import "./App.css";
import React from "react";

import { useState } from 'react'


function App() {
<<<<<<< HEAD
  return (
    <Header />
  );
=======

  fetch("/dummy/Dailyoutfits", {
    method: "GET",
    credentials: "include",
  }).then((response) => response.json())
    .then((data) => console.log(data));

  return Header();
>>>>>>> main
}

export default App;
