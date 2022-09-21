import React from 'react';
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
  color: 'white'
});

const User = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
  color: 'white'
});

// TODO: replace username with prop.username
export default function Navbar() {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <User>
          <Avatar />
          Username
        </User>

        <Searchbar />

        <MenuBtn>Menu</MenuBtn>
      </StyledToolbar>
    </AppBar>
  );
}
