import React, {useEffect, useState} from "react";
import { Paper, Typography, FormControl, RadioGroup, Radio, FormControlLabel, TextField, Button } from "@mui/material";
import DigitalClock from "./DigitalClock";
import img from '../static/dashboardPic.png'

export const WeatherDashboard = (props) => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/dummy/getForecast/${zipCode}`, {
              method: "GET",
              credentials: "include",
            });
            const json = await response.json();
            setWeather(json)
            setTemp(json.temp0)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();

    const [weather, setWeather] = useState(NaN)
    const [zipCode, setZipcode] = useState({})
    const changeTemp =  (i, t) => {
        return t == 'f' ? Math.round(i) : Math.round(((i - 32)*(5/9)))
    }
    const handleSetZipcode = (zipCode) => {
        setZipcode(zipCode)
    }
    const [tempType, setTempType] = useState('c')
    const [temp, setTemp] = useState(changeTemp(weather.temp0, tempType))
    const handleChange = (v) => {
        setTempType(v.target.value)
        tempType == 'f' ? setTemp(changeTemp(weather.temp0, tempType)) : setTemp(changeTemp(weather.temp0, tempType))
    }

    return (
        <>
            <div style = {{justifyContent: "center", alignItems: "center", display: "flex", paddingTop: "5%"}}>
                <Paper 
                sx = {{
                    width: "50%",
                    textAlign: "center",
                }}
                elevation={3}
                square = {false}
                >
                    <Typography variant = "h3" fontFamily = 'Caudex'> Today's Weather </Typography>
                    <DigitalClock />
                    <img src={img} style = {{float: "left", width: "50%", padding: "5%"}}/>
                    <div style = {{float: "right", padding: "5%"}}>
                        {isNaN(weather.temp0) && 
                        <>
                        <TextField id="outlined-basic" 
                        label="Enter Zip Code" 
                        variant="outlined" 
                        onChange={(newValue) => handleSetZipcode(newValue.target.value)}
                        />
                        <div />
                        <Button variant="contained" onClick = {fetchData} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Fetch Weather!</Button>

                        </>
                        }
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
