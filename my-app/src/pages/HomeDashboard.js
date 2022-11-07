import React, {useState} from "react";
import Outfit from "../component/Outfit";
import { Typography } from "@mui/material";
import WeatherDashboard from '../component/WeatherDashboard'


export const HomeDashboard = (props) => {
    const [zipcode, setZipcode] = useState(-1)
    const [fetchedOutfitData, setFetchedOutfitData] = useState({hasOutfit: false, fetchError: false})
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
            console.log("here and not an error. the returned json looks like:")
            console.log(json)
            setOutfit(json)
            setFetchedOutfitData({hasOutfit: true})
          } catch (error) {
            setFetchedOutfitData({hasOutfit: false, fetchError: true})
            console.log("error", error);
          }
        };
        return (
        <>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', py: 15, mb:10, backgroundColor:'rgb(191, 172, 224)'}} >Hi, User {props.userId}</Typography>
            <div>
            <WeatherDashboard zipCode = {zipcode} setZipcode = {setZipcode} fetchGeneratedOutfit = {fetchGeneratedOutfit} setHasOutfit = {setFetchedOutfitData}/>
            {zipcode !== -1 && fetchedOutfitData.hasOutfit == true &&
            <Outfit zipcode={parseInt(zipcode)} outfit = {outfit}/>
            }
            {fetchedOutfitData.hasOutfit == false && fetchedOutfitData.fetchError == true && 
                <h3> Unable to fetch an outfit at the current time. Please try again later or submit a trouble ticket. </h3>
            }
            </div> 
        </>
        );
    
};

export default HomeDashboard;
