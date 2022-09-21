import React from 'react';
// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// my components
import SubmitBtn from './SubmitBtn';

const WelcomeMsg = styled(Typography)({
  textAlign: 'center',
  padding: '20px'
});

const SidebarContainer = styled(Box)({
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%',
  width: '20%',
  padding: '20px',
  borderRight: 'solid 2px'
});

// TODO: replace username with prop.username
export default function Sidebar() {
  return (
    <SidebarContainer>
      <Stack>
        <WelcomeMsg variant="h3">G&apos;day John</WelcomeMsg>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="My Photos" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Shared With Me" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Recent" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Liked" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Trash" />
        </ListItemButton>
      </Stack>

      <SubmitBtn content="upload" />
    </SidebarContainer>
  );
}
