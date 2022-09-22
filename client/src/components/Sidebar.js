import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// my components
import Progressbar from './Progressbar';

const WelcomeMsg = styled(Typography)({
  textAlign: 'center',
  fontWeight: '600',
  padding: '20px 20px 40px 20px'
});

const SidebarContainer = styled(Box)({
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'flex-start',
  width: '20%',
  // TODO: toggle off sidebar in mobile view
  minWidth: '250px',
  borderRight: 'solid 1px lightgrey',
  padding: '20px'
});

// TODO: replace username with prop.username
export default function Sidebar(props) {
  return (
    <SidebarContainer>
      <Stack>
        <WelcomeMsg variant="h3">G&apos;day John</WelcomeMsg>
        <ListItemButton component="a" href="#">
          <ListItemText primary="My Photos" />
        </ListItemButton>
        <ListItemButton component="a" href="#">
          <ListItemText primary="Shared With Me" />
        </ListItemButton>
        <ListItemButton component="a" href="#">
          <ListItemText primary="Recent" />
        </ListItemButton>
        <ListItemButton component="a" href="#">
          <ListItemText primary="Liked" />
        </ListItemButton>
        <ListItemButton component="a" href="#">
          <ListItemText primary="Trash" />
        </ListItemButton>
      </Stack>

      <Progressbar value={props.usage} />
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  usage: PropTypes.number.isRequired
};
