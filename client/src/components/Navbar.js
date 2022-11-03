import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// data
import { UserContext } from '../App';
// mui components
import {
  styled,
  // Box,
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
import Popup from './Popup';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '50px',
  borderBottom: 'solid 1px',
  borderColor: theme.palette.divider
}));

const MenuBtn = styled(Button)(({ theme }) => ({
  // todo: use the text palette in theme
  color: theme.palette.text.primary,
  transition: 'transform 200ms ease 0s, background 200ms ease 0s',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const User = styled(Button)(({ theme }) => ({
  // use the text color specified in theme
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
  transition: 'transform 200ms ease 0s, background 200ms ease 0s',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

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
      border: 'solid 1px black',
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
        <Popup>
          <Typography align="center">Are you sure you want to logout?</Typography>
          <Stack direction="row" gap={2}>
            <Button
              sx={{ border: 'solid 1px black' }}
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}>
              Yes
            </Button>
            <Button sx={{ border: 'solid 1px black' }} variant="contained" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Popup>
      </Modal>
    </>
  );
}

Navbar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func
};
