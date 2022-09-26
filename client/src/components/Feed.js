import React, { useEffect, useState } from 'react';
<<<<<<< HEAD

=======
>>>>>>> a8b6226 (get folders and photos)
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';

// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// mui icons
import FolderIcon from '@mui/icons-material/Folder';

// my components
import PhotoFrame from '../components/PhotoFrame';

// import { Photo101 } from '../data/photo-data';
import { Button, Box, Modal, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

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

const FolderFrame = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '50px'
});

const FolderContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap'
});

const Folder = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  border: '2px solid',
  width: '250px',
  height: '50px',
  padding: '10px',
  gap: '20px',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
});

// TODO: add current directory
export default function Feed(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
<<<<<<< HEAD
=======
  const data = useSelector((state) => state.photos);
  const folders = data.folders;
>>>>>>> a8b6226 (get folders and photos)

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

    // printing form data entries
    for (var pair of formData.entries()) {
      console.log('formdata entries:' + pair[0] + ', ' + pair[1]);
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
        <SubmitForm id="upload-form" onSubmit={handleSubmit} enctype="multipart/form-data">
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
      {data && (
        <>
          <FolderFrame>
            <Typography variant="h3">Folders</Typography>
            {folders && (
              <FolderContainer>
                {folders.map((folder, id) => {
                  return (
                    <Folder key={id}>
                      <FolderIcon />
                      <Typography>{folder}</Typography>
                    </Folder>
                  );
                })}
              </FolderContainer>
            )}
          </FolderFrame>
          <PhotoFrame photos={data.photos} query={props.query}></PhotoFrame>
        </>
      )}
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string
};
