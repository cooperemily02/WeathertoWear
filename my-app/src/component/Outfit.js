import React, {useState} from "react";
import { Typography } from "@mui/material";
import {Box, Grid, Button  } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import top from "../static/top.png";
import bottom from "../static/bottom.png";
import shoes from "../static/shoes.jpg";
import coat from "../static/coat.png";

export const Outfit = (props) => {
    let [outfit, setOutfit] = useState([{name: 'Nike tank top', attributes: []}, {name: 'blue lulu shorts', attributes: []}, {name: 'adidas sneakers', attributes: []}, {name: 'denim jacket', attributes: []}]);
    console.log(outfit);
    let namesOfPieces = [];
    for (let i = 0; i< outfit.length; i++){
        namesOfPieces.push(outfit[i].name);
    }
    console.log(namesOfPieces);
    const image = (piece) => {
        if (piece === 'Nike tank top'){
            return top;
        }
        if (piece == 'blue lulu shorts'){
            return bottom;
        }
        if (piece == 'adidas sneakers'){
            return shoes;
        }
        if (piece === 'denim jacket'){
            return coat;
        }
    }
    if (namesOfPieces == 0){
        return ( 
            <>
                <Grid container justifyContent={"center"} sx={{pt: 10}}>
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
        let outfitItems = namesOfPieces.map((piece) => {
            return (
                <Box display="flex" justifyContent="space-between" sx={{pt: 10}}>
                    <Typography variant="h4"  sx={{color: 'white', fontFamily: 'Caudex', pt:15}} >{piece.charAt(0).toUpperCase() + piece.slice(1)}</Typography>
                    <img src={image(piece)} alt={piece} height="250" />
                </Box> 
            );
        })
        return (
            <>
                <Grid container justifyContent={"center"} sx={{pt: 10}}>
                    <Card variant={"outlined"} sx={{maxWidth: 800, px: 5, backgroundColor:'rgb(156, 180, 204)'}}>
                        <CardContent>
                            <Typography variant="h3" textAlign={'center'} sx={{color: 'white', fontFamily: 'Caudex', pt: 5}} >Here is your generated outfit for today: </Typography>
                            {outfitItems}
                        </CardContent>
                    </Card>   
                </Grid>  
            </>
        );
    }
};

export default Outfit;