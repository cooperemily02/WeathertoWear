import logo from "./logo.svg";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import "./App.css";
import React from "react";

import { useState } from 'react'


function App() {
  const [userId, setUserId] = useState(1);
  return (
    <Header userId = {userId}/>
  );
}

export default App;
