import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
import { useSelector } from 'react-redux';
// mui components
import {
  styled,
  Button,
  Box,
  Modal,
  TextField,
  // Typography,
  Stack,
  // Skeleton,
  Fab,
  Skeleton
} from '@mui/material';
// mui icons
// import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
// my components
import PhotoFrame from '../components/PhotoFrame';
import FolderFrame from '../components/FolderFrame';
import Directory from '../components/Directory';
//import FoldersPage from '../pages/FoldersPage';

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

const FeedSkeleton = () => {
  return (
    <Stack spacing={3}>
      <Skeleton variant="text" width={230} height={50} sx={{ fontSize: '1rem' }} />
      <Stack direction="row" gap={10}>
        <Skeleton variant="rounded" width={250} height={70} />
        <Skeleton variant="rounded" width={250} height={70} />
        <Skeleton variant="rounded" width={250} height={70} />
        <Skeleton variant="rounded" width={250} height={70} />
      </Stack>
      <Skeleton variant="text" width={230} height={50} sx={{ fontSize: '1rem' }} />
      <Stack direction="row" gap={10}>
        <Skeleton variant="rounded" width={250} height={250} />
        <Skeleton variant="rounded" width={250} height={250} />
        <Skeleton variant="rounded" width={250} height={250} />
        <Skeleton variant="rounded" width={250} height={250} />
      </Stack>
    </Stack>
  );
};

// TODO: add current directory
export default function Feed(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImageUrl(null);
    setSelectedImage(null);
  };

  // get folders and photos
  // const { data, isLoading } = useSelector((state) => state.photos);
  const { folders, photos, isLoading } = useSelector((state) => state.photos);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      console.log(selectedImage.name);
    }
  }, [selectedImage]);

  // var bodyFormData = new FormData();
  const handleUpload = (e) => {
    //e.preventDefault();

    var formData = new FormData(e.target);
    // formData.append("name", e.target.name.value);
    // formData.append("description", e.target.description.value);
    // formData.append("selectedImage", e.target.selectedImage);

    const API =
      process.env.NODE_ENV === 'production'
        ? 'https://flyingspaghetti-server.herokuapp.com/folder/root'
        : 'http://localhost:9000/folder/root';

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios
      .post(API, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <SubmitForm id="upload-form" onSubmit={handleUpload} enctype="multipart/form-data">
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

      <>
        {isLoading ? (
          <FeedSkeleton />
        ) : (
          <>
            <Directory currFolder={props.pageID}></Directory>
            <FolderFrame folders={folders} pageID={props.pageID} query={props.query}></FolderFrame>
            {/*{props.pageID === 'folders' ? <Typography variant="h3">Photos</Typography> : <></>}*/}
            <PhotoFrame photos={photos} query={props.query}></PhotoFrame>
          </>
        )}
      </>
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string,
  pageID: PropTypes.string
};
