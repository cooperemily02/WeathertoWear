import React, {useState} from "react";
import { Typography } from "@mui/material";
import {Box, Grid, Button  } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import img from "../static/W2W.png";

export const Outfit = (props) => {
    let [outfit, setOutfit] = useState({top: 'Nike tank top', bottom: 'blue lulu shorts', shoes: 'adidas sneakers', outerwear: 'denim jacket'});
    console.log(outfit);
    if (props.zipcode == 0){
        return ( 
            <>
                <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', py: 10}} >Hi, User {props.userId}</Typography>  
                <Grid container justifyContent={"center"}>
                    <Card variant={"outlined"} sx={{maxWidth: 800, px: 5, backgroundColor:'rgb(156, 180, 204)'}}>
                        <CardContent>
                            <Typography variant="h4" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', pt: 5}} >Please enter your zipcode above to see your generated outfit. </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        );
    }
    else {
        return (
            <>
                <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', py: 10}} >Hi, User {props.userId}</Typography>
                <Grid container justifyContent={"center"}>
                    <Card variant={"outlined"} sx={{maxWidth: 800, px: 5, backgroundColor:'rgb(156, 180, 204)'}}>
                        <CardContent>
                            <Typography variant="h3" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', pt: 5}} >Here is your generated outfit for today: </Typography>
                            {
                                Object.keys(outfit).map((key, index) => (
                                    <Box display="flex" justifyContent="space-between" sx={{pt: 10}}>
                                        <Typography variant="h4"  sx={{color: 'white', fontFamily: 'Caudex', pt:15}} >{key.charAt(0).toUpperCase() + key.slice(1)}: {outfit[key]}</Typography>
                                        <img src={img} alt={outfit.top} height="250" />
                                    </Box>  
                                ))
                            }   
                        </CardContent>
                    </Card>   
                </Grid>  
            </>
        );
    }
};

export default Outfit;