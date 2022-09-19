import { Box, Button, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react';
import { Stack } from '@mui/system';

const Sidebar = () => {
  return (
    <>
      <Box bgcolor="white" p={2} flex={2} justifyContent="center">
        <Box display="flex" alignItems="center" justifyContent="center" padding="50px">
          <Typography variant="h5">Gday John</Typography>
        </Box>

        <Stack spacing={4} justifyContent="center" margin="0 20px">
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <PhotoSizeSelectActualIcon />
            </ListItemIcon>
            <ListItemText primary="My Photos" />
          </ListItemButton>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Shared With Me" />
          </ListItemButton>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Recent" />
          </ListItemButton>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </Stack>

        <Stack
          direction="column"
          spacing={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="100px 0">
          <Box width="90%" height="10px" border={2} bgcolor="white" borderRadius={2}></Box>
          <Button color="secondary" variant="contained" justifyContent="center">
            Upload
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
