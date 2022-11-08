import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// mui components
import { useTheme, styled, Toolbar, Button, TextField } from '@mui/material';
// my components
import ColorModeToggle from '../components/ColorModeToggle';

function Logo() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Button
      sx={{
        width: '100px',
        color: theme.palette.text.primary
      }}
      variant="text"
      onClick={() => {
        navigate('/');
      }}>
      Photo Share
    </Button>
  );
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '50px',
  borderBottom: 'solid 1px',
  borderColor: theme.palette.divider
}));

const RegisterForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90vh',
  gap: '10px'
});

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
    <div
      style={{
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
      <StyledToolbar>
        <Logo />
        <ColorModeToggle />
      </StyledToolbar>
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
    </div>
  );
}
