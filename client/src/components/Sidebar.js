import { Box, Button, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const Sidebar = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert('Image upload');
    });
  };
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
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <Button
            onClick={uploadImage}
            color="secondary"
            variant="contained"
            justifyContent="center">
            Upload
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
