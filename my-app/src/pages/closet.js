import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ClothingItem from "../component/ClothingItem";
import Box from "@mui/material/Box";


const Closet = (props) => {
  let [clothingItems, setClothingItems] = useState([])
  const userId = props.userId
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("/dummy/Closet", {
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();
        setClothingItems(json)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);
  return (
    <>
      <Typography variant="h3" sx = {{padding: "20px"}}>Your Closet:</Typography>
      <Box display="flex">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          width="auto"
          padding="10px"
          spacing={2}
        >
          {console.log(clothingItems)}
          {clothingItems.map((item) => {
            return (
              <Grid item xs>
                <ClothingItem item={item}></ClothingItem>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
export default Closet;

