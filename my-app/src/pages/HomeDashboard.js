import React, {useState} from "react";
import Outfit from "../component/Outfit";
import { Typography, TextField, Button } from "@mui/material";
import WeatherDashboard from '../component/WeatherDashboard'


export const HomeDashboard = (props) => {
    function isValidUSZip(sZip) {
      return /^\d{5}(-\d{4})?$/.test(sZip);
    }
    const [zipcode, setZipcode] = useState(-1)
    const [enteredZipcode, setEnteredZipcode] = useState("")
    const [fetchedOutfitData, setFetchedOutfitData] = useState({hasOutfit: false, fetchError: false})
    const [weather, setWeather] = useState(false)
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
                zipcode: enteredZipcode
               }),
               headers: {
                 'Content-type': 'application/json; charset=UTF-8',
               },
            });
            const json = await response.json();
            setOutfit(json)
            setFetchedOutfitData({hasOutfit: true})
          } catch (error) {
            setFetchedOutfitData({hasOutfit: false, fetchError: true})
            console.log("error", error);
          }
        };
      const handleSetZipcode = (zipCode) => {
         setEnteredZipcode(zipCode)
      }

      const handleButtonClick = () => {
        if(isValidUSZip(enteredZipcode)){
          setZipcode(enteredZipcode)
          fetchGeneratedOutfit()
          fetchWeatherData()
        }
        else{
          alert("Entered ZipCode is invalid. Please try again.");
        }
      }
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(`/dummy/getForecast/${enteredZipcode}`, {
            method: "GET",
            credentials: "include",
          });
          const json = await response.json();
          setWeather(json)
        } catch (error) {
          console.log("error", error);
        }
      };


        return (
        <>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', py: 15, mb:10, backgroundColor:'rgb(191, 172, 224)'}} >Hi, User {props.userId}</Typography>
            {zipcode == -1 && 
              <>
                <div style = {{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                  <TextField id="outlined-basic" 
                  label="Enter Zip Code" 
                  variant="outlined" 
                  onChange={(newValue) => handleSetZipcode(newValue.target.value)}
                  />
                  <Button variant="contained" onClick = {handleButtonClick} sx={{display: "block", justifyContent:"center", alignItems: "center", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Fetch Weather & Outfits!</Button>
                </div>
              </>
            }
            <div>
            <WeatherDashboard zipCode = {zipcode} weather = { weather }/>
              
            {zipcode !== -1 && fetchedOutfitData.hasOutfit == true &&
              <Outfit outfit = {outfit} fetchedOutfitData = {fetchedOutfitData}/>
            }
            {fetchedOutfitData.hasOutfit == false && fetchedOutfitData.fetchError == true && 
                <h3> Unable to fetch an outfit at the current time. Please try again later or submit a trouble ticket. </h3>
            }
            </div> 
        </>
        );
    
};

export default HomeDashboard;
