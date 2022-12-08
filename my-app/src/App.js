import logo from "./logo.svg";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import "./App.css";
import React from "react";

import { useState } from 'react'


export default function App() {
  const [user, setUser] = useState({userName: "", userId: 0});
  // console.log(user);
  return (
    <Header user={user} setUser={setUser}/>
  );
}
