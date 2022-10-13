import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
        "&:hover": {
            color: "darkblue",
            borderBottom: "1px solid black",
          },
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
      <>
        <Drawer
        open = {openDrawer}
        onClose={()=>setOpenDrawer(false)}>
          <List>
           <ListItem onClick = {()=>setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" class = {classes.link}>Home</Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick = {()=>setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/dailyoutfits" class = {classes.link}>Daily Outfits</Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick = {()=>setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/closet" class = {classes.link}>Closet</Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick = {()=>setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/laundrybin" class = {classes.link}>Laundry Bin</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{color: "#FFFFFF"}}/>
      </IconButton>
      </>
    );
  }
  export default DrawerComponent;