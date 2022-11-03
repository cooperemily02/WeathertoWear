import React from "react";
import { Typography } from "@mui/material";

export const HomeDashboard = (props) => {
    return (
        <>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 10}} >Hi, User {props.userId}</Typography>
        </>
    );
};

export default HomeDashboard;
