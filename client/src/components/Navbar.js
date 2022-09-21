import React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '50px'
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  width: '150px',
  marginRight: 'auto',
  padding: '0 10px'
}));

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

        <Search>
          <InputBase placeholder="SEARCH" />
        </Search>

        <MenuBtn>Menu</MenuBtn>
      </StyledToolbar>
    </AppBar>
  );
}
