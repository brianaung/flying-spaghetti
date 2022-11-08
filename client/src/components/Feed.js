import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
// mui components
import {
  useTheme,
  styled,
  Alert,
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  Stack,
  Switch,
  Snackbar,
  Fab,
  FormGroup,
  FormControlLabel,
  Autocomplete,
  Skeleton
} from '@mui/material';
// mui icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
// my components
import PhotoFrame from '../components/PhotoFrame';
import FolderFrame from '../components/FolderFrame';
import Directory from '../components/Directory';
import Popup from '../components/Popup';

const FeedContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  gap: '50px',
  justifyContent: 'flex-start',
  padding: '30px',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const UploadForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
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
  const theme = useTheme();
  const dispatch = useDispatch();

  const [photoAlert, setPhotoAlert] = useState(false);
  const [folderAlert, setFolderAlert] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // handle the modals open states
  const [open, setOpen] = useState(false);
  const [openF, setOpenF] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImageUrl(null);
    setSelectedImage(null);
  };
  const handleOpenF = () => setOpenF(true);
  const handleCloseF = () => setOpenF(false);

  const { folders, photos, isLoading } = useSelector((state) => state.photos);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // upload photo
  const handleUpload = (e) => {
    e.preventDefault();
    // close the popup
    handleClose();
    //construct data to post
    var formData = new FormData(e.target);
    if (!formData.has('isPrivate')) {
      formData.append('isPrivate', false);
    } else if (formData.get('isPrivate') === 'on') {
      formData.set('isPrivate', true);
    }

    const API =
      process.env.NODE_ENV === 'production'
        ? `https://photoshare-fs-server.herokuapp.com/folder/${e.target.folder.value}`
        : `http://localhost:9000/folder/${e.target.folder.value}`;

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios
      .post(API, formData)
      .then((res) => {
        dispatch({ type: 'UPLOAD_PHOTO', payload: res.data });
        // show success popup (set state)
        setPhotoAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNewFolder = (e) => {
    e.preventDefault();
    // close the popup
    handleCloseF();
    const API =
      process.env.NODE_ENV === 'production'
        ? `https://photoshare-fs-server.herokuapp.com/createFolder`
        : `http://localhost:9000/createFolder`;

    axios
      .post(API, {
        folderName: e.target.folderName.value,
      })
      .then((res) => {
        dispatch({ type: 'CREATE_FOLDER', payload: res.data });
        // show success popup (set state)
        setFolderAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FeedContainer>
      {/* event notis */}
      <Snackbar
        open={photoAlert}
        autoHideDuration={6000}
        onClose={() => setPhotoAlert(false)}
      >
        <Alert onClose={() => setPhotoAlert(false)} severity="success" sx={{ width: '100%' }}>
          Photo successfully uploaded.
        </Alert>
      </Snackbar>
      <Snackbar
        open={folderAlert}
        autoHideDuration={6000}
        onClose={() => setFolderAlert(false)}
      >
        <Alert onClose={() => setFolderAlert(false)} severity="success" sx={{ width: '100%' }}>
          Folder successfully created.
        </Alert>
      </Snackbar>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          sx={{ border: 'solid 1px black', color: theme.palette.background.main }}
          color="info"
          size="medium"
          variant="extended"
          aria-label="add"
          onClick={handleOpen}>
          <CloudUploadOutlinedIcon sx={{ mr: 1 }} />
          Upload Photo
        </Fab>
        <Fab
          sx={{ border: 'solid 1px black', color: theme.palette.background.main }}
          color="error"
          size="medium"
          variant="extended"
          aria-label="add"
          onClick={handleOpenF}>
          <CreateNewFolderOutlinedIcon sx={{ mr: 1 }} />
          New Folder
        </Fab>
      </Box>

      {/* create new folder form */}
      <Modal
        open={openF}
        onClose={handleCloseF}
      >
        <>
        <Popup>
          <UploadForm id="newfolder-form" onSubmit={handleNewFolder}>
            Enter the folder name:
            <TextField
              sx={{ fieldset: { borderColor: theme.palette.divider } }}
              InputLabelProps={{
                style: {
                  color: theme.palette.text.primary
                }
              }}
              variant="outlined"
              name="folderName"
              label="Folder Name"
              fullWidth></TextField>

              <Button color="secondary" variant="contained" type="submit">
                Create
              </Button>
          </UploadForm>
        </Popup>
        </>
      </Modal>

      {/* Popup photo upload form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <>
          <Popup>
            <UploadForm id="upload-form" onSubmit={handleUpload} enctype="multipart/form-data">
              <>
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

                <TextField
                  sx={{ fieldset: { borderColor: theme.palette.divider } }}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.text.primary
                    }
                  }}
                  variant="outlined"
                  name="name"
                  label="Name"
                  fullWidth></TextField>
                <TextField
                  sx={{ fieldset: { borderColor: theme.palette.divider } }}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.text.primary
                    }
                  }}
                  variant="outlined"
                  name="description"
                  label="Description"
                  fullWidth></TextField>

                <Autocomplete
                  sx={{ width: 200, fieldset: { borderColor: theme.palette.divider } }}
                  disablePortal
                  id="combo-box-demo"
                  options={['root'].concat(folders)}
                  defaultValue={'root'}
                  renderInput={(params) => <TextField name="folder" {...params} />}
                />

                <FormGroup>
                  <FormControlLabel
                    name="isPrivate"
                    label="private"
                    control={<Switch inputProps={{ 'aria-label': 'controlled' }} />}
                  />
                </FormGroup>

                <Button color="secondary" variant="contained" type="submit">
                  Upload
                </Button>
              </>
            </UploadForm>
          </Popup>
        </>
      </Modal>

      {/* Main Feed Area */}
      <>
        {isLoading ? (
          <FeedSkeleton />
        ) : (
          <Stack gap={5}>
            <Directory currFolder={props.pageID}></Directory>

            {folders.length === 0 && photos.length === 0 && (
              <Typography variant="h3">THIS FOLDER IS EMPTY.</Typography>
            )}

            {folders.length > 0 && (
              <FolderFrame
                folders={folders}
                pageID={props.pageID}
                query={props.query}></FolderFrame>
            )}

            {photos.length > 0 && <PhotoFrame photos={photos} query={props.query}></PhotoFrame>}
          </Stack>
        )}
      </>
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string,
  pageID: PropTypes.string
};
