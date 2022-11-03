import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../actions/auth';
// mui components
import {
  styled,
  Stack,
  Modal,
  Button,
  Typography,
  TextField,
  Link,
  CircularProgress
} from '@mui/material';
// my components
import Popup from '../components/Popup';

const HomeContainer = styled(Stack)({
  padding: '0 300px',
  height: '100%',
  alignItems: 'center',
  minHeight: '100vh'
});

const LoginForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
});

export default function Home(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(e.target.email.value, e.target.password.value));
  };

  const { isLoading, user } = useSelector((state) => state.auth);
  // set user in App.js
  useEffect(() => {
    props.handleLogin(user);
  }, [user]);

  return (
    <HomeContainer direction="row">
      <Stack alignItems="flex-start" gap={5}>
        <Typography variant="h1">PHOTO SHARE</Typography>
        <p>
          <Typography variant="h3">
            Put your memories on display. Show off your photos in a way that’s both beautiful and
            intuitive, on this very best platform to safely share and organize your family’s photos.
            <br />
          </Typography>
        </p>

        {/* popup form for login */}
        <Modal open={open} onClose={handleClose}>
          <Popup gap={2}>
            <LoginForm id="login-form" onSubmit={postLogin}>
              <TextField id="email" name="email" variant="outlined" label="Email"></TextField>
              <TextField
                id="password"
                name="password"
                variant="outlined"
                label="Password"
                type="password"></TextField>
              <Button variant="contained" type="submit">
                Login
              </Button>
              {isLoading && <CircularProgress />}
            </LoginForm>
            <Typography>
              No account?{' '}
              <Link href="/register" underline="none" variant="body2">
                Register here
              </Link>
            </Typography>
          </Popup>
        </Modal>

        {/* Login/Register buttons */}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleOpen}>
            LOGIN
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/register');
            }}>
            GET STARTED
          </Button>
        </Stack>
      </Stack>
    </HomeContainer>
  );
}

Home.propTypes = {
  handleLogin: PropTypes.func
};
