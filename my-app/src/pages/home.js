import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import logo from '../static/W2W.png'
import background from '../static/transparentClothes.png' 
import { Link } from "react-router-dom"
import HomeDashboard from "./HomeDashboard";
import { Button, Modal, Box, TextField, FormControl, Paper } from "@mui/material";
import WeatherDashboard from "../component/WeatherDashboard";
import { Grid } from "@mui/material";
import SignIn from "../component/SignIn";
import SignUp from "../component/SignUp";


const Home = (props) => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [enteredId, setEnteredId] = useState("");
    const [validId, setIsValidId] = useState(false)

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
  const backgroundImageStyle={
    backgroundImage: `url(${background})`,
    height:'100vh',
    marginTop:'0%',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  


    return (
    <>
    <div style = {backgroundImageStyle}>
      <div style = {{paddingTop: "1%"}}>
          <div style = {{
            justifyContent: "center",
            textAlign: "center",
            verticalAlign: "middle",
            width: "70%",
            backgroundColor: "#F2D7D9",
            borderTopRightRadius: "5%",
            borderTopLeftRadius: "5%",
            borderBottomRightRadius: "5%",
            borderBottomLeftRadius: "5%",
            margin: "5%",
            marginLeft: "15%",
            marginRight: "15%"
          }}>
            <img src = {logo} width = {"30%"}/>
            <Typography variant="h2" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35, paddingTop: "0px"}} >
              <b>Weather to Wear</b>
            </Typography> 
            <Typography variant="h4" textAlign={'center'} sx={{color: 'black', fontFamily: 'Caudex', pt: 35, padding: "5%"}} >
              Don't know what to wear? Sign up to generate outfits based on the clothes in your closet and the weather in your area.
            </Typography> 
            <div>
              <Link to = "/signUp">
                <Button variant="contained" href = "/signUp" onClick = {SignUp(props)} sx={{margin: "5px", justifyContent:"center", backgroundColor: 'rgb(191, 172, 224)', fontFamily: 'Caudex', ': hover': { backgroundColor: 'rgb(160, 132, 202)'}}}><b>Sign Up</b></Button>
              </Link>
              <Link to = "/signIn">
                <Button variant="contained" href = "/signIn" onClick = {SignIn(props)} sx={{margin: "5px", justifyContent:"center", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}><b>Sign In</b></Button>
              </Link>
            </div>
          </div>
      </div>
    </div>
      {/* <Modal
      open={openSignUp}
      onClose={handleCloseSignUp}
      >
      <Box sx = {style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sign up for a user ID
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Click the "generate user ID" button to generate a unique user ID.
        </Typography>
        {userId == -1 &&
        <Button variant="contained" onClick = {signUpUser(1)} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Generate ID!</Button>
        }
        {
        userId != -1 && 
          <Typography sx = {{fontWeight: "bold", justifyContent:"center", alignItems: "center", display: "flex", padding: "10px"}}> Your generated ID is: {userId} </Typography>
        }
      </Box>
  </Modal> */}
  {/* <Modal
      open={openLogin}
      onClose={handleCloseLogin}
      >
      <Box sx = {style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login to Weather to Wear
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter your user ID to see your closet and generated outfits
        </Typography>
        {userId == -1 &&
        <>
        <TextField 
          id= "standard-basic"
          error = {validId}
          type = "number"
          sx = {{justifyContent:"center", marginTop: "10px", alignItems: "center", display: "flex"}} 
          onChange={(newValue) => {
            setEnteredId(parseInt(newValue.target.value))
            signInAttempt(newValue.target.value)
          }}
          helperText = {!validId && "Enter a valid ID"}
          variant="standard"
          required
          />
        <Link to = "/homeDashboard">
          <Button variant="contained" href = "/homeDashboard" onClick = {signInAttempt(enteredId)} sx={{justifyContent:"center", alignItems: "center", display: "flex", marginTop: "20px", marginInline: "auto", fontFamily: 'Caudex', backgroundColor: 'rgb(248, 196, 180)', ': hover': { backgroundColor: 'rgb(255, 180, 180)'}}}>Login</Button>
        </Link>
        </>
        }
        {
        userId != -1 && 
          <Typography sx = {{fontWeight: "bold", justifyContent:"center", alignItems: "center", display: "flex", padding: "10px"}}> Hello user {userId}, you are sucessfully logged in! </Typography>
        }
      </Box>
  </Modal> */}
      {/* <Typography>
        {userId !== -1 && <HomeDashboard userId={userId} />}
      </Typography> */}
    </>
    );
};

export default Home;


