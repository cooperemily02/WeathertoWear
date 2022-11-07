import React, {useState} from "react";
import Outfit from "../component/Outfit";
import { Typography } from "@mui/material";
import WeatherDashboard from '../component/WeatherDashboard'


export const HomeDashboard = (props) => {
    const [zipcode, setZipcode] = useState(-1)
    const userId = props.userId
    let [outfit, setOutfit] = useState([]);

    //console.log(outfit);
    //console.log(zipcode);
    const fetchGeneratedOutfit = async () => {
        try {
            const response = await fetch("/gen-outfit", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                user: userId,
                zipcode: zipcode
               }),
               headers: {
                 'Content-type': 'application/json; charset=UTF-8',
               },
            });
            const json = await response.json();
            setOutfit(json)
          } catch (error) {
            console.log("error", error);
          }
        };
        return (
        <>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', py: 15, mb:10, backgroundColor:'rgb(191, 172, 224)'}} >Hi, User {props.userId}</Typography>
            <div>
            <WeatherDashboard zipCode = {zipcode} setZipcode = {setZipcode} fetchGeneratedOutfit = {fetchGeneratedOutfit}/>
            {zipcode !== -1 && 
            <Outfit zipcode={parseInt(zipcode)} outfit = {outfit}/>
            }
            </div> 
        </>
        );
    
};

export default HomeDashboard;
