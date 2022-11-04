import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// mui components
import { useTheme, styled, Box, Button, TextField } from '@mui/material';

// TODO: make it a seperate component
function Logo() {
  const navigate = useNavigate();
  return (
    <Button
      color="secondary"
      variant="text"
      onClick={() => {
        navigate('/');
      }}>
      Share
    </Button>
  );
}

const RegisterForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90vh',
  gap: '10px'
});

// TODO: style it
export default function Register() {
  const theme = useTheme();

  const handleRegister = (e) => {
    e.preventDefault();

    const registerApi =
      process.env.NODE_ENV === 'production'
        ? 'https://photoshare-fs-server.herokuapp.com/register'
        : 'http://localhost:9000/register';

    // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    console.log(e.target.email.value);
    axios
      .post(registerApi, {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then((res) => {
        alert(res.data.code);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.primary,
        height: '100vh'
      }}>
      <Logo />
      <RegisterForm id="register-form" onSubmit={handleRegister}>
        <TextField
          sx={{ fieldset: { borderColor: theme.palette.divider } }}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary
            }
          }}
          id="firstName"
          name="firstName"
          variant="outlined"
          label="First Name"></TextField>
        <TextField
          sx={{ fieldset: { borderColor: theme.palette.divider } }}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary
            }
          }}
          id="lastName"
          name="lastName"
          variant="outlined"
          label="Last Name"></TextField>
        <TextField
          sx={{ fieldset: { borderColor: theme.palette.divider } }}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary
            }
          }}
          id="email"
          name="email"
          variant="outlined"
          label="Email"></TextField>
        <TextField
          sx={{ fieldset: { borderColor: theme.palette.divider } }}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary
            }
          }}
          id="password"
          name="password"
          variant="outlined"
          label="Password"
          type="password"></TextField>
        <Button color="secondary" variant="contained" type="submit">
          Register
        </Button>
      </RegisterForm>
    </Box>
  );
}
