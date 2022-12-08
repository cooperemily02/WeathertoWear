import React, {useEffect, useState} from "react";
import { Paper, Typography, FormControl, RadioGroup, Radio, FormControlLabel, TextField, Button } from "@mui/material";
import DigitalClock from "./DigitalClock";
import otherImg from '../static/dashboardPic.png'
import cloudyWeather from '../static/weatherconditions/cloudyWeather.png'
import hotWeather from '../static/weatherconditions/hotWeather.jpeg'
import coldWeather from '../static/weatherconditions/coldWeather.png'
import niceWeather from '../static/weatherconditions/niceWeather.png'
import rainyWeather from '../static/weatherconditions/rainyWeather.jpg'
import snowyWeather from '../static/weatherconditions/snowyWeather.png'
import stormyWeather from '../static/weatherconditions/stormyWeather.png'
import windyWeather from '../static/weatherconditions/windyWeather.png'
import logo from '../static/W2W.png'




export const WeatherDashboard = (props) => {
        const zipCode = props.zipCode
        const setZipcode = props.setZipcode
        const weather = props.weather
        const weatherToImg = {
            clouds: cloudyWeather,
            clear: niceWeather,
            snow: snowyWeather,
            rain: rainyWeather,
            drizzle: rainyWeather,
            thunderstorm: stormyWeather,
            hot: hotWeather,
            cold: coldWeather,
            other: {otherImg}
        }

        
    const [weatherImg, setImg] = useState(logo)

    useEffect(() => {
        if((weather)!==false){
        handleSetImg(weather.weather0, weather.temp0)
        setTemp(weather.temp0)
        }
    }, [weather])
    const changeTemp =  (i, t) => {
        return t == 'f' ? Math.round(i) : Math.round(((i - 32)*(5/9)))
    }

    const handleSetImg = (weather, temp) => {
        if(weather == 'Thunderstorm'){
            setImg(weatherToImg.thunderstorm)
        }
        else if(weather == "Snow"){
            setImg(weatherToImg.snow)
        }
        else if (weather == "Drizzle"){
            setImg(weatherToImg.drizzle)
        }
        else if (weather == "Rain"){
            setImg(weatherToImg.rain)
        }
        else if (weather == "Clouds"){
            setImg(weatherToImg.clouds)
        }
        else if (weather =="Clear"){
            if (temp>=80){
                setImg(weatherToImg.hotWeather)
            }
            else if (temp<=50){
                setImg(weatherToImg.coldWeather)
            }
            else{
                setImg(weatherToImg.clear)
            }
        }
        else{
            setImg(logo)
        }
    }
    const [tempType, setTempType] = useState('c')
    const [temp, setTemp] = useState(changeTemp(weather.temp0, tempType))
    const handleChange = (v) => {
        setTempType(v.target.value)
        tempType == 'f' ? setTemp(changeTemp(weather.temp0, tempType)) : setTemp(changeTemp(weather.temp0, tempType))
    }

    return (
        <>
            <div style = {{justifyContent: "center", alignItems: "center", display: "flex", paddingTop: "1%", paddingBottom: "5%"}}>
                <Paper 
                sx = {{
                    width: "50%",
                    textAlign: "center",
                }}
                elevation={3}
                square = {false}
                >
                    {console.log(weather)}
                    <Typography variant = "h3" fontFamily = 'Caudex'> Today's Weather for <b>{weather.city_name}</b></Typography>
                    <DigitalClock />
                    <img src={weatherImg} style = {{float: "left", width: "45%", padding: "5%"}}/>
                    <div style = {{float: "right", padding: "5%"}}>
                        {!(isNaN(weather.temp0)) &&
                        <>
                        <Typography variant = "h4" fontFamily = 'Caudex'><b>{temp}º </b></Typography>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value = {tempType}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="c" control={<Radio />} label= {<Typography fontFamily = 'Caudex'>Fahrenheit</Typography> }/>
                                <FormControlLabel value="f" control={<Radio />} label={<Typography fontFamily = 'Caudex'> Celcius </Typography> }/>
                            </RadioGroup>
                         </FormControl>
                        <Typography variant = "h6" fontFamily = 'Caudex'> Today's Forcast Is: <b>{weather.weather0}</b> </Typography>
                        </>
                        }
                    </div>
                </Paper>
            </div>
        </>
    );
};

export default WeatherDashboard;