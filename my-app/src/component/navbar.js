import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Drawer from "./Drawer";
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: "5px",
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    marginLeft: "auto",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: "10px",
    "&:hover": {
      color: "white",
      borderBottom: "1px solid white",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar position="static" sx={{backgroundColor: 'rgb(116, 141, 166)'}}>
      <CssBaseline />
      {/* <IconButton>
            <CloseIcon />
      </IconButton> */}
      <Toolbar >
        <Drawer />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{fontFamily: 'Caudex'}} variant="h4" className={classes.logo}>
            Weather to Wear
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
