import React, {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ClothingItem from "../component/ClothingItem";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import BasicSelect from "../component/textField";
import {Modal, Button, TextField, InputLabel, MenuItem, FormControl} from '@mui/material'
import Select from 'react-select'


const Closet = (props) => {
  let [clothingItems, setClothingItems] = useState([])
  const [addItemModal, openAddItem] = useState(false);

  const userId = props.userId

  const handleAddItem = () =>{
    openAddItem(true)
  }
  const handleCloseModal = () => {
    openAddItem(false)
  }

  const [enteredItemName, setItemName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedWeatherAttributes, setWeatherAttributes] = useState([]);


  const handleChangeWeatherAttributes= (attributes) => {
    let items = []
    attributes.map(item => {
      items.push(item.value)
    })
    setWeatherAttributes(items)
  };

  const handleChangeItemName = (name) =>{
    setItemName(name)
  }

  const handleChangeType= (type) => {
    setSelectedType(type.value);
  };
  
  const handleOnClick = () => {
    selectedWeatherAttributes.push(selectedType)
    let clothingItem = {name: enteredItemName, attributes: selectedWeatherAttributes}
    fetch('/dummy/postOutfit', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({
       user: userId,
       item: clothingItem
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          // Handle data
       })
       .catch((err) => {
          console.log(err.message);
       });
    console.log(clothingItem)
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

  const optionsForType = [
    // { value: 'tank_top', label: 'Tank Top' },
    // { value: 'short_sleeve', label: 'Short Sleeve Shirt' },
    // { value: 'long_sleeve', label: 'Long Sleeve Shirt' },
    // { value: 'light_jacket', label: 'Light Jacket' },
    // { value: 'rain jacket', label: 'Rain Jacket' },
    // { value: 'shorts', label: 'Shorts'},
    // { value: 'leggings', label: 'Leggings'},
    // { value: 'long_pants', label: 'Long Pants'},
    // { value: 'jeans', label: 'Jeans'},
    // { value: 'winter_jacket', label: 'Winter Jacket' }

    { value: 'bottom', label: 'Bottom'},
    { value: 'top', label: 'Top'},
    { value: 'jacket', label: 'Jacket'},
    { value: 'shoes', label: 'Shoes'},
  ]
  const optionsForWeather = [
    { value: 'rainy', label: 'Rainy' },
    { value: 'snowy', label: 'Snowy' },
    { value: 'hot', label: 'Hot' },
    { value: 'cold', label: 'Cold' },
    { value: 'windy', label: 'Windy' },
    { value: 'average_temp', label: 'Average Temperature' },
  ]

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
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="h3" sx = {{paddingBottom: "1px", paddingTop: "20px", marginTop: "auto"}}>Your Closet:</Typography>
      </div>
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Button variant="contained" onClick = {handleAddItem} sx = {{backgroundColor: 'rgb(211, 206, 223)', color: 'rgb(105,105,105)', hover: { backgroundColor: 'rgb(255, 180, 180)'}}}>
        Add Item
      </Button>
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
                <ClothingItem item={item} />
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
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Add Item
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: "5px"}}>
          Enter the information about your item 
        </Typography>
        <TextField sx = {{width: "100%", padding: "5px"}}id="standard" label="Name of item" variant="standard" onChange={(newValue) => handleChangeItemName(newValue.target.value)}/>
        <div style = {{paddingBlock: "5px"}}>
          <b>This item is a:</b>
          <Select 
            styles = {{margin: 5}}
            placeholder = {"Enter item type..."}
            onChange = {handleChangeType}
            closeMenuOnSelect={true}
            options={optionsForType}
          />
          </div>
        <div style = {{paddingBlock: "5px"}}>
          <b>Item is good for this type of weather:</b>
          <Select
            closeMenuOnSelect={false}
            isMulti
            onChange = {handleChangeWeatherAttributes}
            placeholder = {"Select one or more attributes"}
            options={optionsForWeather}
          />
        </div>
        <Button variant="contained" onClick = {handleOnClick} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Add Item To Closet</Button>
        
      </Box>
  </Modal>
    </>
  );
};
export default Closet;

