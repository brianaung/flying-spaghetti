import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// mui components
import {
  styled,
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  Stack,
  Fab,
  Skeleton
} from '@mui/material';
// mui icons
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
// my components
import PhotoFrame from '../components/PhotoFrame';

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

const FeedSkeleton = () => {
  return (
    <Stack spacing={3}>
      <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
      <Stack direction="row" gap={20}>
        <Skeleton variant="rounded" width={250} height={70} />
        <Skeleton variant="rounded" width={250} height={70} />
        <Skeleton variant="rounded" width={250} height={70} />
      </Stack>
      <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
      <Stack direction="row" gap={20}>
        <Skeleton variant="rounded" width={250} height={250} />
        <Skeleton variant="rounded" width={250} height={250} />
        <Skeleton variant="rounded" width={250} height={250} />
      </Stack>
    </Stack>
  );
};

// TODO: add current directory
export default function Feed(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  // get folders and photos
  const { data, isLoading } = useSelector((state) => state.photos);
  const folders = data.folders;

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

    const API = process.env.NODE_ENV === 'production' ? 'https://flyingspaghetti-server.herokuapp.com/dashboard/upload_photo' : 'http://localhost:9000/dashboard/upload_photo';

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios
      .post(API, formData)
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

      {!isLoading ? (
        <>
          <FolderFrame>
            <Typography variant="h3">Folders</Typography>
            {folders && (
              <FolderContainer>
                {folders.map((folder) => {
                  return (
                    <Folder key={folder} onClick={() => navigate(`/folder/${folders}`)}>
                      <FolderIcon />
                      <Typography>{folder}</Typography>
                    </Folder>
                  );
                })}
              </FolderContainer>
            )}
          </FolderFrame>
          <Typography variant="h3">Photos</Typography>
          <PhotoFrame photos={data.photos} query={props.query}></PhotoFrame>
        </>
      ) : (
        <FeedSkeleton />
      )}
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string
};
