import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
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

// TODO: replace username with prop.username
export default function Navbar(props) {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <User>
          <Avatar />
          {props.user.firstName}
        </User>

        <Searchbar query={props.query} setQuery={props.setQuery} />

        <MenuBtn>Menu</MenuBtn>
      </StyledToolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  user: PropTypes.object
};
