import logo from "./logo.svg";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import "./App.css";
import React from "react";

import { useState } from 'react'


export default function App() {
  const [user, setUser] = useState({userName: "Bob", userId: 0});
  // const [name, setName] = useState();
  // const [password, setPassword] = useState();
  // const [email, setEmail] = useState();
  console.log("sup");
  console.log(user);
  return (
    <Header user={user} setUser={setUser}/>
  );
}
