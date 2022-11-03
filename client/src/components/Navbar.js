import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// data
import { UserContext } from '../App';
// mui components
import {
  styled,
  Box,
  Modal,
  Typography,
  Stack,
  Button,
  AppBar,
  Toolbar,
  Avatar
} from '@mui/material';
// my components
import Searchbar from './Searchbar';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '50px'
});

const MenuBtn = styled(Button)({
  color: 'white',
  transition: 'transform 200ms ease 0s, background 200ms ease 0s',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
});

const User = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
  color: 'white',
  transition: 'transform 200ms ease 0s, background 200ms ease 0s',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
});

const LinkBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexDirection: 'column'
});

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      color: 'black',
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

// TODO: replace username with prop.username
export default function Navbar(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <StyledToolbar>
          <User>
            <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
            {user.firstName}
          </User>

          <Searchbar query={props.query} setQuery={props.setQuery} />

          <MenuBtn onClick={handleOpen}>Logout</MenuBtn>
        </StyledToolbar>
      </AppBar>

      <Modal open={open} onClose={handleClose}>
        <LinkBox>
          <Typography align="center">Are you sure you want to logout?</Typography>
          <Stack direction="row" gap={2}>
            <Button
              sx={{ border: 'solid 2px black' }}
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}>
              Yes
            </Button>
            <Button
              sx={{ border: 'solid 2px black' }}
              variant="contained"
              color="primary"
              onClick={handleClose}>
              No
            </Button>
          </Stack>
        </LinkBox>
      </Modal>
    </>
  );
}

Navbar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func
};
