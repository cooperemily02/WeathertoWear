import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
  Menu,
} from "@mui/material";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
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



function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userId = props.userId
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    props.setUserId(-1)
    setAnchorEl(null)
  };
  return (
    <AppBar position="static" sx={{backgroundColor: 'rgb(116, 141, 166)'}}>
      <CssBaseline />
      {/* <IconButton>
            <CloseIcon />
      </IconButton> */}
      <Toolbar >
        <Drawer userId = {userId} />
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
        <div style = {{
            position: "absolute",
            left: "95%",
            top: "50%",
            transform: "translate(-50%, -50%)",}}>
          { userId !== -1 && 
          <IconButton onClick={handleClick}>
            <AccountCircleRoundedIcon style = {{color: 'white'}} fontSize = "large" />
          </IconButton>
          }
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem component={Link} to = '/' onClick={handleClose} >Logout</MenuItem>
        </Menu>
      </div>
      </Toolbar>
    </AppBar>

  );
}
export default Navbar;
