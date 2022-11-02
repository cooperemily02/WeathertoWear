import React, {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ClothingItem from "../component/ClothingItem";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import {Modal, Button} from '@mui/material'


const Closet = () => {
  let [clothingItems, setClothingItems] = useState([])
  const [addItemModal, openAddItem] = useState(false);
  const handleAddItem = () =>{
    openAddItem(true)
  }
  const handleCloseModal = () => {
    openAddItem(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
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
      <div display = "inline-block">
      <Typography variant="h3" sx = {{padding: "20px", float: "left", marginTop: "auto"}}>Your Closet:</Typography>
      <IconButton onClick = {handleAddItem} sx = {{float: "left"}}>
      <AddIcon  />
      Add Item
      </IconButton>
      </div>
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
      <Modal
      open={addItemModal}
      onClose={handleCloseModal}
      >
      <Box sx = {style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter the information about your item 
        </Typography>
        <Button variant="contained" onClick = {{}} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Add Item</Button>
        
      </Box>
  </Modal>
    </>
  );
};
export default Closet;

