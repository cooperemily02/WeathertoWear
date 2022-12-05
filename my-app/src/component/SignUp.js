import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeDashboard from '../pages/HomeDashboard';
//import { data } from 'jquery';
//import { DateProfileGenerator } from '@fullcalendar/react';

const theme = createTheme();

export default function SignUp(props) {
  console.log("hayyyyyy")
  console.log(props);
  var user = props.user;
  var setUser = props.setUser;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name').toString();
    const email = data.get('email').toString();
    const password = data.get('password').toString();
    // console.log(name);
    // console.log(email);
    // console.log(password)
    const createdUser = {
      name: name,
      password: password,
      email: email
    }
    try{
      const response = await fetch("/dummy/userSignUp", {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(createdUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await response.json();
      setUser(json);
    } catch (error) {
      console.log("hi error", error);
    }
    console.log({
      email: data.email,
      password: data.password,
    });
  };

  function signUpUser(id) {
    console.log("HOIIIIIIII")
    return fetchData();
  }

  const fetchData = async () => {
    console.log("sup");
    // try {
    //   const response = await fetch("/dummy/userSignUp", {
    //     method: "GET",
    //     credentials: "include",
    //   });
    //   const json = await response.json();
    //   console.log(json.userId)
    //   props.setUser(json.userId)
    // } catch (error) {
    //   console.log("error", error);
    // }
    // try {
    //   const response = await fetch("/dummy/userSignUp", {
    //     method: "GET",
    //     credentials: "include",
    //     body: JSON.stringify({
    //       name: data.get('name'),
    //       password: data.get('password'),
    //       email: data.get('email')
    //     }),
    //   });
    //   //const user = await response.json();
    //   // props.setUser({userName: user.userName, userId: user.userId});

    // } catch (error) {
    //   console.log("hi error", error);
    // }
    console.log(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h4" sx={{fontFamily: 'Caudex'}}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, fontFamily: 'Caudex' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  sx={{fontFamily: 'Caudex'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
              {/* <Link to = "/homeDashboard"> */}
                <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick = {() => signUpUser(1)}
                // href = "/homeDashboard"
                sx={{ mt: 3, mb: 2, fontFamily: 'Caudex', backgroundColor: 'rgb(191, 172, 224)', ': hover': { backgroundColor: 'rgb(160, 132, 202)'}}}
                >
                    Sign Up
                </Button>
              {/* </Link> */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signIn" href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}