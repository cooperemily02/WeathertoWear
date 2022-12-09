import React, {useState} from "react";
import { Typography } from "@mui/material";
import {Box, Grid, Button  } from "@mui/material";
import ClothingItem from "./ClothingItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import top from "../static/top.png";
import bottom from "../static/bottom.png";
import shoes from "../static/shoes.jpg";
import coat from "../static/coat.png";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import postData from "../utils"

export const Outfit = (props) => {
    const outfit = props.outfit
    const userId = props.userId
    const generateOutfitFunction = props.generateOutfitFunction
    const onRegenItem = async (index, item_template, excluded_item) => {
        console.log('Trying to regen item:', excluded_item, 
            'with template: ', item_template
        )

        //TODO: replace hardcoded user
        const new_item = await postData('item-from-template', {
            user: 1, item_template: item_template, excluded_item: excluded_item
        })
        props.updateSinglePiece(index, new_item)
        console.log(new_item)
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
        let outfitItems = outfit.map((piece, i) => {
            console.log(piece)
            return (
                <Box display="flex" justifyContent="space-between" sx={{pt: 10}}>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => onRegenItem(i, piece.item_template, piece.id)}>
                        <RefreshIcon />
                    </IconButton>
                    <Typography variant="h4"  sx={{color: 'white', fontFamily: 'Caudex', pt:15}} >{piece.name.charAt(0).toUpperCase() + piece.name.slice(1)}</Typography>
                    <ClothingItem item = {piece} parent = {{type: "laundry", updateFunction: {}}} userId = {userId}></ClothingItem>
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