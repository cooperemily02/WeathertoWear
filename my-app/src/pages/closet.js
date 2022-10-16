import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ClothingItem from "../component/ClothingItem";
import Box from "@mui/material/Box";

const Closet = (props) => {
  let clothingItems = props.clothingItems;
  return (
    <>
      <Typography variant="h2">Your Closet:</Typography>
      <Box display="flex">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          width="auto"
          padding="10px"
          spacing={2}
        >
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
