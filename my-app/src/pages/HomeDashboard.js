import React, {useState} from "react";
import Outfit from "../component/Outfit";
import { Typography } from "@mui/material";
import WeatherDashboard from "../component/WeatherDashboard";


export const HomeDashboard = (props) => {
    let [outfit, setOutfit] = useState({top: 'Nike tank top', bottom: 'blue lulu shorts', shoes: 'adidas sneakers', outerwear: 'denim jacket'});
    console.log(outfit);
    return (
        <>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', py: 15, mb:10, backgroundColor:'rgb(191, 172, 224)'}} >Hi, User {props.userId}</Typography>
            <WeatherDashboard />  
            <Outfit />
        </>
    );
};

export default HomeDashboard;
