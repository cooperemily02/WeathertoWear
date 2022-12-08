import React, {useState} from "react";
import Outfit from "../component/Outfit";
import { Typography, TextField, Button } from "@mui/material";
import WeatherDashboard from '../component/WeatherDashboard'
import postData from "../utils";


export const HomeDashboard = (props) => {
    const [zipcode, setZipcode] = useState(-1)
    const [enteredZipcode, setEnteredZipcode] = useState("")
    const [fetchedOutfitData, setFetchedOutfitData] = useState({hasOutfit: false, fetchError: false})
    const [weather, setWeather] = useState(false)
    const user = props.user
    //console.log(user);
    let [outfit, setOutfit] = useState([]);

    //console.log(outfit);
    //console.log(zipcode);
    const fetchGeneratedOutfit = async () => {
        try {
            const response = await fetch("/gen-outfit", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                user: user,
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
        setZipcode(enteredZipcode)
        fetchGeneratedOutfit()
        fetchWeatherData()
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

      const updateSinglePiece = (index, new_item) => {
        let _outfit = [...outfit]
        _outfit[index] = new_item
        setOutfit(_outfit)
      }


        return (
        <>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', py: 15, mb:10, backgroundColor:'rgb(191, 172, 224)'}} >Hi, {user.userName}</Typography>
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
              <Outfit userId = {userId} outfit = {outfit} fetchedOutfitData = {fetchedOutfitData} generateOutfitFunction = {fetchGeneratedOutfit} updateSinglePiece={updateSinglePiece}/>
            }
            {fetchedOutfitData.hasOutfit == false && fetchedOutfitData.fetchError == true &&
              <div> 
                <Typography variant="h5" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex'}}> Unable to fetch an outfit at the current time. Please try again later or submit a trouble ticket. </Typography>
              </div>
            }
            </div> 
        </>
        );
    
};

export default HomeDashboard;
