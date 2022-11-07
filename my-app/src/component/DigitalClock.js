import { useState } from "react";
import { Typography } from "@mui/material";

export const DigitalClock = () => {
    let time  = new Date().toLocaleTimeString()
    const [ctime,setTime] = useState(time)
    const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString()
        setTime(time)
    }
  setInterval(UpdateTime)
    return (
        <>
            <Typography variant = "h4" fontFamily = 'Caudex'>{ctime}</Typography>
        </>
    )
}
export default DigitalClock;