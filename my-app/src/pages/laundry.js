import React, {useEffect, useState} from "react";
import { Paper, Stack, Typography, Box, Grid, FormControl, InputLabel, MenuItem } from "@mui/material";
import ClothingItem from "../component/ClothingItem";
import Select from 'react-select'

const Laundry = (props) => {
    const [itemTypeToShow, setItemTypeToShow] = useState('Tops')
    const handleChange = (event) => {
        setItemTypeToShow(event.value);
    };
    const sortClothingItems = (items) => {
        const sortedItems = {Tops: [], Bottoms: [], Shoes: [], Outerwear: [], Other: []}
        items.forEach(item => {
          if (item.tags.includes("top")){
            sortedItems.Tops.push(item)
          }
          else if (item.tags.includes("bottom")){
            sortedItems.Bottoms.push(item)
          }
          else if (item.tags.includes("shoes")){
            sortedItems.Shoes.push(item)
          }
          else if (item.tags.includes("outerwear")){
            sortedItems.Outerwear.push(item)
          }
          else {
            sortedItems.Other.push(item)
          }
        })
        return sortedItems
      }
      const sortedClothingItems = sortClothingItems([
        {
            name: "Test Item",
            tags: ["hot", "cold", "top"]
        }
    ])
    const clothingItems = [
        {
            name: "test",
            tags: ["cold", "warm", "rainy"]
        }
    ]
    return (
        <>
        <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35, paddingTop: "5px"}} > User {props.userId}'s Laundry Bin </Typography>     
        <Paper elevation = {6} style = {{backgroundColor: "#f5f5f5", margin: "5px", width: "75%", display: "flex", marginInline: "auto", justifyContent: "center", alignItems: "center", textAlign: "center", paddingBottom: "5%", paddingInline: "10%"}}>
        <Box sx = {{
          flexGrow: 1, 
          marginTop: "5%", 
          }}>
          
            <div style = {{padding: "5px"}}>
            <Typography variant="h4" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35, paddingTop: "8px"}} > <b>{itemTypeToShow}</b> </Typography>
            <hr style = {{marginInline: "20%", padding: "5px"}}/>
            <div style = {{width: "50%", margin: "auto", padding: "5%", justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                <Select
                closeMenuOnSelect={true}
                onChange = {handleChange}
                placeholder = {"Select Laundry Type"}
                options={[
                    {value: "Tops", label: "Tops"},
                    {value: "Bottoms", label: "Bottoms"},
                    {value: "Shoes", label: "Shoes"},
                    {value: "Outerwear", label: "Outerwear"},
                    {value: "Other", label: "Other"},
                ]}>
                </Select>
            </div>
            <Grid container justifyContent = "center" spacing={5}>
              {sortedClothingItems[itemTypeToShow].map((item) => (
                <Grid item xs={2} sm={4} md={4}>
                  <ClothingItem item = {item}></ClothingItem>
                </Grid>
              ))}
          </Grid>
          </div>
        </Box>
      </Paper>

        </>
    )
}
export default Laundry