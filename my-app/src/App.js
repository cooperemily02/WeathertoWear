import logo from "./logo.svg";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import "./App.css";
import React from "react";

import { useState } from 'react'


function App() {

  fetch("/dummy/Dailyoutfits", {
    method: "GET",
    credentials: "include",
  }).then((response) => response)
    .then((data) => console.log(data));

  return Header();
}

export default App;
