import React, {useState} from "react";
import { Typography } from "@mui/material";
import {Box, Grid, Button  } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import top from "../static/top.png";
import bottom from "../static/bottom.png";
import shoes from "../static/shoes.jpg";
import coat from "../static/coat.png";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

export const Outfit = (props) => {
    const outfit = props.outfit
    const generateOutfitFunction = props.generateOutfitFunction
    console.log(outfit)
    let namesOfPieces = [];
    for (let i = 0; i< outfit.length; i++){
        namesOfPieces.push(outfit[i].name);
    }
    const image = (tags) => {
        if (tags.includes("top")){
            return top;
        }
        else if (tags.includes("bottom")){
            return bottom;
        }
        else if (tags.includes("shoes")){
            return shoes;
        }
        else if (tags.includes("outerwear")){
            return coat;
        }
    }
    if (outfit.length == 0 || props.fetchedOutfitData.hasOutfit == false){
        return ( 
            <>
                <Grid container justifyContent={"center"} sx={{pt: 10}}>
                    <Card variant={"outlined"} sx={{maxWidth: 800, px: 5, backgroundColor:'rgb(156, 180, 204)'}}>
                        <CardContent>
                            <Typography variant="h4" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', pt: 5}} > Unable to generate an outfit. </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        );
    }
    else {
        let outfitItems = outfit.map((piece) => {
            console.log(piece)
            return (
                <Box display="flex" justifyContent="space-between" sx={{pt: 10}}>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <RefreshIcon />
                    </IconButton>
                    <Typography variant="h4"  sx={{color: 'white', fontFamily: 'Caudex', pt:15}} >{piece.name.charAt(0).toUpperCase() + piece.name.slice(1)}</Typography>
                    <img src={image(piece.tags)} alt={piece} height="250" />
                </Box> 
            );
        })
        return (
            <>
                <Grid container justifyContent={"center"} sx={{pt: 10}}>
                    <Card variant={"outlined"} sx={{maxWidth: 800, px: 5, backgroundColor:'rgb(156, 180, 204)'}}>
                        <CardContent>
                            <Typography variant="h3" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', pt: 5}} >Here is your generated outfit for today: </Typography>
                            <IconButton color="primary" aria-label="" sx = {{justifyContent: "center"}} onClick = {generateOutfitFunction}>
                                <RefreshIcon /> Refresh Outfit 
                            </IconButton>
                            {outfitItems}
                        </CardContent>
                    </Card>   
                </Grid>  
            </>
        );
    }
};

export default Outfit;