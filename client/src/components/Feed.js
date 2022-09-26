import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// my components
import FolderFrame from '../components/FolderFrame';
import PhotoFrame from '../components/PhotoFrame';
import { Photo101 } from '../data/photo-data';
import { Button, Box, Modal, TextField } from '@mui/material';

const FeedContainer = styled(Stack)(({ theme }) => ({
  gap: '50px',
  justifyContent: 'flex-start',
  padding: '30px',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const SubmitForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  backgroundColor: 'white',
  border: '2px solid black',
  p: 4,
  padding: '20px'
});

// TODO: add current directory
export default function Feed(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      console.log(selectedImage.name);
    }
  }, [selectedImage]);

  // var bodyFormData = new FormData();
  const handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData(e.target);
    // formData.append("name", e.target.name.value);
    // formData.append("description", e.target.description.value);
    // formData.append("selectedImage", e.target.selectedImage);

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios
      .post('http://localhost:9000/dashboard/upload_photo', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    for (var pair of formData.entries()) {
      console.log('formdata entries:' + pair[0]+ ', ' + pair[1]); 
    }
  };

  return (
    <FeedContainer>
      <Fab
        sx={{ border: 'solid 2px' }}
        color="secondary"
        size="medium"
        aria-label="add"
        onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <SubmitForm id="upload-form" onSubmit={handleSubmit}>
          <input
            accept="image/*"
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            name="selectedImage"
          />
          {imageUrl && selectedImage && (
            <Box mt={2} mb={2} textAlign="center">
              <img src={imageUrl} alt={selectedImage.name} height="200px" />
            </Box>
          )}

          <TextField name="name" variant="outlined" label="Name" fullWidth></TextField>
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            fullWidth></TextField>

          <Button variant="contained" color="primary" type="submit">
            Upload
          </Button>
        </SubmitForm>
      </Modal>

      <FolderFrame></FolderFrame>
      <PhotoFrame photos={Photo101} query={props.query}></PhotoFrame>
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string
};
