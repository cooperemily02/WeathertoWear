import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const Home = () => {
    return (
    <>
      <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35}} >
        Weather to Wear
      </Typography> 
      <Typography textAlign={'center'}>
        <Button variant="contained" sx={{justifyContent:"center", backgroundColor: 'rgb(191, 172, 224)', fontFamily: 'Caudex', ': hover': { backgroundColor: 'rgb(160, 132, 202)'}}}>Sign Up</Button>
        <Button variant="contained" sx={{justifyContent:"center", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Sign In</Button>
      </Typography>
    </>
    );
};

export default Home;


