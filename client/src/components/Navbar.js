import { AppBar, InputBase, styled, Toolbar, Typography, Avatar } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between'
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '20%'
}));

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography variant="h6">Name</Typography>
        </Stack>
        <Search>
          <InputBase placeholder="search" fullWidth value={'hello'} />
        </Search>
        <Typography variant="h6">Menu</Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
