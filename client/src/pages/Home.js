import { styled, Stack, Modal, Button, Typography, TextField } from '@mui/material';
import React from 'react';
// mui components
// my components
// import Gallery from '../components/Gallery';

const HomeContainer = styled(Stack)({
  padding: '0 300px',
  height: '100%',
  alignItems: 'center',
  minHeight: '100vh'
});

/* const TextGrid = styled(Grid)({
  padding: '30px',
  border: 'solid 2px black',
  backgroundColor: 'white'
}); */

const LoginBox = styled(Stack)({
  alignItems: 'center',
  padding: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
});

const LoginForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
});

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <HomeContainer direction="row">
      <Stack alignItems="flex-start" gap={5}>
        <Typography variant="h1">SHARE</Typography>
        <Typography variant="h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          GET STARTED
        </Button>

        <Modal open={open} onClose={handleClose}>
          <LoginBox gap={2}>
            {/* TODO: add option to signup here */}

            <Typography color="gray">or</Typography>
            <LoginForm id="login-form">
              <TextField name="username" variant="outlined" label="Username"></TextField>
              <TextField
                name="password"
                variant="outlined"
                label="Password"
                type="password"></TextField>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </LoginForm>
          </LoginBox>
        </Modal>
      </Stack>
    </HomeContainer>
  );
}
