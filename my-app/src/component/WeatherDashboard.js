import React, {useEffect, useState} from "react";
import { Paper, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import DigitalClock from "./DigitalClock";
import img from '../static/dashboardPic.png'

export const WeatherDashboard = (props) => {
    const weather = {'day0': '2022-11-03 20:00:00', 'temp0': 287.54, 'weather0': 'Clear'}
    const changeTemp =  (i, t) => {
        return t == 'f' ? ((Math.round((i-273.15)*9/5+32))) : Math.round((i - 273.15))
    }
    const [tempType, setTempType] = useState('f')
    const [temp, setTemp] = useState(changeTemp(weather.temp0, tempType))
    const handleChange = (v) => {
        console.log(weather.temp0)
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
                    </div>
                </Paper>
            </div>
        </>
    );
};

export default WeatherDashboard;
