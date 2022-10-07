import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// mui components
import { Button, TextField } from '@mui/material';

// TODO: make it a seperate component
function Logo() {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      onClick={() => {
        navigate('/');
      }}>
      Share
    </Button>
  );
}

// TODO: style it
export default function Home() {
  const handleRegister = (e) => {
    e.preventDefault();

    const registerApi =
      process.env.NODE_ENV === 'production'
        ? 'https://flying-spaghetti-server.herokuapp.com/register'
        : 'http://localhost:9000/register';

    // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios
      .post(registerApi, {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Logo />
      <form id="register-form" onSubmit={handleRegister}>
        <TextField
          id="firstName"
          name="firstName"
          variant="outlined"
          label="First Name"></TextField>
        <TextField id="lastName" name="lastName" variant="outlined" label="Last Name"></TextField>
        <TextField id="email" name="email" variant="outlined" label="Email"></TextField>
        <TextField
          id="password"
          name="password"
          variant="outlined"
          label="Password"
          type="password"></TextField>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </>
  );
}
