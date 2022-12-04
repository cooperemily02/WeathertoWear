import logo from "./logo.svg";
import Button from "@mui/material/Button";
import Header from "./component/Header";
import "./App.css";
import React from "react";
import OutfitTemplateForm from "./component/OutfitTemplateForm";

import { useState } from 'react'


export default function App() {
  const [userId, setUserId] = useState(-1);
  return (
    <OutfitTemplateForm/>
  );
}
