import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// mui components
import { styled, Button, AppBar, Toolbar, Avatar } from '@mui/material';
// import { deepPurple } from '@mui/material/colors';
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
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <StyledToolbar>
        <User>
          <Avatar {...stringAvatar(`${props.user.firstName} ${props.user.lastName}`)} />
          {props.user.firstName}
        </User>

        <Searchbar query={props.query} setQuery={props.setQuery} />

        <MenuBtn
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>
          Logout
        </MenuBtn>
      </StyledToolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  user: PropTypes.object
};
