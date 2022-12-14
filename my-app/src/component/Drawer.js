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

function DrawerComponent(props) {
  const userId = props.userId
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{color: 'black'}} userId = {userId}>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)} sx={{color: 'rgb(156, 180, 204)'}}>
            <ListItemText>
              <Link to={userId == 0 ? "/" : "/homeDashboard"} class={classes.link} sx={{color: 'rgb(156, 180, 204)'}}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
          {userId!=0 &&
          <>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/closet" class={classes.link}>
                Closet
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/laundry" class={classes.link}>
                Laundry Bin
              </Link>
            </ListItemText>
          </ListItem>
          </>
        }
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: "#FFFFFF" }} />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
