import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: 'rgb(116, 141, 166)',
    fontSize: "30px",
    fontFamily: 'Caudex',
    "&:hover": {
      color: 'rgb(156, 180, 204)',

    },
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{color: 'black'}}>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)} sx={{color: 'rgb(156, 180, 204)'}}>
            <ListItemText>
              <Link to="/" class={classes.link} sx={{color: 'rgb(156, 180, 204)'}}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
          {/* <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/dailyoutfits" class={classes.link}>
                Daily Outfits
              </Link>
            </ListItemText>
          </ListItem> */}
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/closet" class={classes.link}>
                Closet
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/laundrybin" class={classes.link}>
                Laundry Bin
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: "#FFFFFF" }} />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
