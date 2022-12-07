import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import {Stack, TextField, List, ListItem, Card, CardContent, CardActionArea, CardMedia, Button, Modal, Box, Typography, ListItemText} from "@mui/material";
import {Delete as DeleteIcon, Edit as EditIcon, LocalLaundryService as LocalLaundryServiceIcon} from '@mui/icons-material';
import {capitalize} from '../helpers'
import Select from 'react-select'
import img from "../static/W2W.png";
import top from "../static/top.png"
import bottom from "../static/bottom.png"
import shoes from "../static/shoes.jpg"
import coat from "../static/coat.png"

function ClothingItem(props) {
  const item = props.item;
  const userId = props.userId
  const parent = props.parent
  var backgroundColor = "FFFFFF" 

  item.tags.forEach(tag => {
    if(tag === "top"){img = top}
    if(tag === "bottom"){img = bottom}
    if(tag === "shoes"){img = shoes}
    if(tag === "outerwear"){img = coat}
    if(tag === "cold"){backgroundColor = "#DAF0F7"}
    if(tag === "hot"){backgroundColor = "#FFBDAF"}
    if(tag === "average_temp"){backgroundColor = "#FFFFCE"}
  })

  function generateDisplayTag(tag, type){
    if (type === 'temp'){
      if(tag === "average_temp"){
        return "Average"
      }
      if(tag === "cold" || tag === "hot"){
        return capitalize(tag)
      }
    }
    else if (type === "weather"){
      if(tag === "rainy" || tag === "snowy" || tag === "windy"){
        return capitalize(tag)
      }
    }

    //Can be edited to include other tags for display
  }

  const sendItemToLaundry = async () => {
    try {
      const response = await fetch("/dummy/sendToLaundry", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          user: userId,
          item: item
         }),
         headers: {
           'Content-type': 'application/json; charset=UTF-8',
         },
      });
      const json = await response.json();
      props.parent.updateFunction(true)
      handleClose()
    } catch (error) {
      console.log("error", error);
    }
  }

  const sendItemToCloset = async () => {
    try {
      const response = await fetch("/dummy/itemWashed", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          user: userId,
          item: item
         }),
         headers: {
           'Content-type': 'application/json; charset=UTF-8',
         },
      });
      const json = await response.json();
      parent.updateFunction(true)
    } catch (error) {
      console.log("error", error);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: "center",
    width: "fit-content",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [addItemModal, openAddItem] = useState(false);

  const handleDelete = async (item) => {
    const deleteItem = "true";
    const selectedItem = {user: userId, item: item, deleteItem: deleteItem};
    try{
      const response = await fetch('/dummy/clothingItem', {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(selectedItem),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await response.json();
      console.log(json);
      if (json.deleted == "true"){
        alert("Clothing item has been deleted.");
        props.parent.updateFunction(true)
        handleClose()
      }
    } catch (error){
      console.log("error", error);
    }     
  }
  
  const handleAddItem = () =>{
    handleClose()
    openAddItem(true)
  }
  const handleCloseModal = () => {
    openAddItem(false)
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState(item.name)
  const [itemTags, setItemTags] = useState(item.tags)
  const [selectedType, setSelectedType] = useState("");
  const [selectedAttributes, setAttributes] = useState([]);
   //This is run when the user changes the attributes on the multiselect dropdown for adding an item
   const handleChangeAttributes= (attributes) => {
    let items = []
    items.map(item => {
      items.push(item.value)
    })
    setItemTags(items)
  };
  const handleChangeType= (type) => {
    setSelectedType(type.value);
  };
  
  const handleOnClick = () => {
  }

  useEffect(()=>{

  }, [props.parent.updateVariable])
  return (
    <>
    {
    <Card sx={{ maxWidth: 250, backgroundColor: `${backgroundColor}`}}>
      <CardActionArea onClick = {parent.type == "closet" && handleOpen || parent.type =="laundry" && sendItemToCloset}>
        <CardMedia component="img" height="100%" width="100%" image={img} alt={item.name} />
        <CardContent>
        <Typography variant="h5" sx={{fontFamily: 'Caudex'}} > <b>{capitalize(item.name)}</b> </Typography>
        </CardContent>
      </CardActionArea>
    </Card>    
    }

    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div display = "block">
        <Typography variant="h3" sx={{fontFamily: 'Caudex', marginTop: "5%"}} > <b>{capitalize(item.name)}</b> </Typography>
        <Button startIcon={<LocalLaundryServiceIcon/>} onClick = {sendItemToLaundry} sx = {{color: "blue", justifyContent: "center", marginBottom: "5%"}}>Put in Laundry Bin</Button>
      </div>
        <Stack 
        direction="row"
        spacing={10}
          sx={{ flexWrap: 'wrap', gap: 1 }}
          >
          <CardMedia component="img" image={img} alt={item.name} sx = {{padding: "7px", width: "50%"}}/>
          <Stack direction = "column" sx = {{textAlign: "left"}}>
            <Typography variant="h5" sx={{fontFamily: 'Caudex'}} > For Weather: </Typography>
            <List>
              {item.tags.map((tag) => {
                return <>
                <ListItem disablePadding>
                  <ListItemText disablePadding>
                    <ul sx = {{listStyleType: "circle"}}>{generateDisplayTag(tag, 'weather')}</ul>
                  </ListItemText>
                </ListItem>
                </>
              })}
            </List>
            <Typography variant="h5" sx={{fontFamily: 'Caudex'}} > For Temperature(s): </Typography>
            <List>
              {item.tags.map((tag) => {
                return <>
                <ListItem disablePadding>
                  <ListItemText disablePadding>
                    <ul sx = {{listStyleType: "circle"}}>{generateDisplayTag(tag, 'temp')}</ul>
                  </ListItemText>
                </ListItem>
                </>
              })}
            </List>
          </Stack>
        </Stack>
        <Stack direction = "row" spacing = {1}>
          <Button variant="outlined" color = "error" fullWidth startIcon={<DeleteIcon/>} onClick = {() => handleDelete(item)}>
            Delete
          </Button>
          <Button variant="outlined" fullWidth startIcon={<EditIcon/>} onClick = {handleAddItem}>
                Edit
          </Button>
        </Stack>
      </Box>
    </Modal>
  </div>


  <Modal
      open={addItemModal}
      onClose={handleCloseModal}
      >
      <Box sx = {style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Edit Item
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: "5px"}}>
          Edit the information about your <b>{item.name}</b>
        </Typography>
        <TextField sx = {{width: "100%", padding: "5px"}} value = {itemName} id="standard" label="Name of item" variant="standard" onChange={(newValue) => setItemName(newValue.target.value)}/>
        <div style = {{paddingBlock: "5px"}}>
          <b>This item is a:</b>
          <Select 
            styles = {{margin: 5}}
            placeholder = {"Enter item type..."}
            onChange = {handleChangeType}
            closeMenuOnSelect={true}
            options={props.optionsForType}
          />
          </div>
        <div style = {{paddingBlock: "5px"}}>
          <b>Item is good for this type of weather:</b>
          <Select
            closeMenuOnSelect={false}
            isMulti
            onChange = {handleChangeAttributes}
            placeholder = {"Select one or more attributes"}
            options={props.optionsForWeather}
          />
        </div>
        <Button variant="contained" onClick = {handleOnClick} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Edit Item</Button>
        
      </Box>
  </Modal>
    </>
  );
}
export default ClothingItem;
