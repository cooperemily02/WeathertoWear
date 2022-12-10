import React, {useEffect, useState, useRef} from "react";
import ClothingItem from "../component/ClothingItem";
import { useNavigate, useLocation } from "react-router-dom";

import {Stack, Grid, Typography, Box, IconButton, Alert, Collapse, Paper, Modal, Button, TextField} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Creatable from 'react-select/creatable';
import { letterSpacing } from "@mui/system";


const Closet = (props) => {
 
  const navigate = useNavigate()
  const userId = props.user.userId
  const name = props.user.userName
  const location = useLocation()

  const handleAddItem = () =>{
    openAddItem(true)
  }
  const handleCloseModal = () => {
    openAddItem(false)
  }

  const inputFile = useRef(null) 
  const [imageOfItem, setImageOfItem] = useState(null)
  const [uploadImageOfItem, setUploadImageOfItem] = useState(null)

  const onImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    setUploadImageOfItem(event.target.files[0])
    setImageOfItem(URL.createObjectURL(event.target.files[0]));
  }
  }


  const [openAlert, setOpenAlert] = React.useState(false);
  const [enteredItemName, setItemName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAttributes, setAttributes] = useState([]);
  const [sortedClothingItems, setSortedClothingItems] = useState({Tops: [], Bottoms: [], Shoes: [], Outerwear: [], Other: []})
  const [addItemModal, openAddItem] = useState(false);
  const [severity, setSeverity] = useState(undefined);
  const [itemSentToLaundry, setItemSentToLaundry] = useState(false)
  var refetchItems = true


  const resetItem = () => {
    setItemName("")
    setSelectedType("")
    setAttributes([])
    setImageOfItem(undefined)
  }

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
    setSortedClothingItems(sortedItems)
    })
  }

  //This is run when the user changes the attributes on the multiselect dropdown for adding an item
  const handleChangeAttributes= (attributes) => {
    let items = []
    attributes.map(item => {
      items.push(item.value)
    })
    setAttributes(items)
  };

  const handleChangeItemName = (name) =>{
    setItemName(name)
  }

  const handleChangeType= (type) => {
    setSelectedType(type.value);
  };
  
  const handleOnClick = () => {
    const deleteItem = "false";
    selectedAttributes.push(selectedType)
    let clothingItem = {name: enteredItemName, attributes: selectedAttributes, image: imageOfItem, file: imageOfItem, filename: "1"}
    const data = new FormData();
    data.append('file', uploadImageOfItem);//, "filename");
    data.append("item", JSON.stringify(clothingItem));
    data.append("user", userId);

    fetch('/dummy/clothingItem', {
      method: 'POST',
      credentials: "include",
      body: data,
    })
       .then((response) => response.json())
       .then((data) => {
          fetchClothingItems()
          resetItem() 
          handleCloseModal()
          setSeverity('success')
          setOpenAlert(true)
          // Handle data
       })
       .catch((err) => {
        resetItem() 
        handleCloseModal()
        setSeverity('error')
        setOpenAlert(true)
          console.log(err.message);
       });
  }

  const onFileButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
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
    { value: 'outerwear', label: 'Outerwear'},
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

  const fetchClothingItems = async () => {
    refetchItems = false
    try {
      const response = await fetch("/dummy/Closet", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          user: userId,
         }),
         headers: {
           'Content-type': 'application/json; charset=UTF-8',
         },
      });
      const json = await response.json();
      if(json.length === 0){
        setSortedClothingItems({Tops: [], Bottoms: [], Shoes: [], Outerwear: [], Other: []})
      }
      else {
        sortClothingItems(json)
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if(userId===-1){
      navigate('/')
    }
    else {
      //setItemSentToLaundry(false)
      fetchClothingItems();
      refetchItems = false
    }
}, [userId, location]);
  return (
    <>
     <Collapse in={openAlert}>
        <Alert
          severity = {severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {severity == 'success' ? "Item Successfully Added!" : "Could not add item. Please try again or submit a trouble ticket."}
        </Alert>
      </Collapse>
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35, paddingTop: "5px"}} > {name}'s Closet </Typography>      </div>
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Button variant="contained" onClick = {handleAddItem} sx = {{margin: "10px", backgroundColor: 'rgb(211, 206, 223)', color: 'rgb(105,105,105)', hover: { backgroundColor: 'rgb(195, 184, 222)'}}}>
        Add Item
      </Button>
      </div>
      <Paper elevation = {6} style = {{backgroundColor: "#f5f5f5", margin: "5px", width: "75%", display: "flex", marginInline: "auto", justifyContent: "center", alignItems: "center", textAlign: "center", paddingBottom: "5%", paddingInline: "10%"}}>
        <Box sx = {{
          flexGrow: 1, 
          marginTop: "5%", 
          }}>
          {Object.entries(sortedClothingItems).map(([type, clothingItems]) => {
            return <div style = {{padding: "5px"}}>
            <Typography variant="h4" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35, paddingTop: "8px"}} > <b>{type}</b> </Typography>
            <hr style = {{marginInline: "20%", padding: "5px"}}/>
            <Grid container justifyContent = "center" spacing={5}>
              {clothingItems.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key = {index}>
                  <ClothingItem item = {item} parent = {{type: "closet", updateFunction: fetchClothingItems}} optionsForType = {optionsForType} optionsForWeather = {optionsForWeather} userId = {userId}></ClothingItem>
                </Grid>
              ))}
          </Grid>

          </div>
          })}
        </Box>
      </Paper>
      <Modal
      open={addItemModal}
      onClose={handleCloseModal}
      >
      <Box sx = {style}>
        <Stack direction = "row">
        <input type='file' accept="image/*" id='file' ref={inputFile} onChange={onImageChange} style={{display: 'none'}}/>
        {!imageOfItem && <Box
          component="span"
          sx={{
            width: 300,
            margin: "5%",
            backgroundColor: 'black',
            borderColor: 'red',
            borderWidth: 'thick',
            borderStyle: 'dashed'
          }}>
          <IconButton
            onClick={onFileButtonClick}
          >
            <FileUploadIcon sx = {{color: 'red'}}/>
          </IconButton>
        </Box>
        }
        {imageOfItem && 
        <Box
          component="span"
          sx={{
            width: 300,
            height: 300,
            margin: "5%",
            backgroundColor: 'black',
            borderColor: 'red',
            borderWidth: 'thick',
            borderStyle: 'dashed',
            justifyContent: 'center',
            display: 'flex'
          }}>
             <img src = {imageOfItem} height = {"100%"} onClick = {onFileButtonClick} style = {{cursor: "pointer"}}></img>
        </Box>
        }
        <Stack direction = "column">
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Add Item
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: "5px"}}>
          Enter the information about your item 
        </Typography>
        <TextField sx = {{width: "100%", padding: "5px"}}id="standard" label="Name of item" variant="standard" onChange={(newValue) => handleChangeItemName(newValue.target.value)}/>
        <div style = {{paddingBlock: "5px"}}>
          <b>This item is a:</b>
          <Creatable 
            styles = {{margin: 5}}
            placeholder = {"Enter item type..."}
            onChange = {handleChangeType}
            closeMenuOnSelect={true}
            options={optionsForType}
          />
          </div>
        <div style = {{paddingBlock: "5px"}}>
          <b>Item is good for this type of weather:</b>
          <Creatable
            closeMenuOnSelect={false}
            isMulti
            onChange = {handleChangeAttributes}
            placeholder = {"Select one or more attributes"}
            options={optionsForWeather}
            
          />
        </div>
        <Button variant="contained" onClick = {handleOnClick} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Add Item To Closet</Button>
        </Stack>
        </Stack>
      </Box>
  </Modal>
    </>
  );
};
export default Closet;

