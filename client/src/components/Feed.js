import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// my components
import FolderFrame from '../components/FolderFrame';
import PhotoFrame from '../components/PhotoFrame';
import { Photo101 } from '../data/photo-data';
import { Box, Modal, TextField } from '@mui/material';

const FeedContainer = styled(Stack)(({ theme }) => ({
  gap: '50px',
  justifyContent: 'flex-start',
  padding: '30px',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const SubmitForm = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '20px'
});

// TODO: add current directory
export default function Feed(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <SubmitForm>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField name="name" variant="outlined" label="Name" fullWidth></TextField>
              <TextField
                name="description"
                variant="outlined"
                label="Description"
                fullWidth></TextField>
            </form>
          </SubmitForm>
        </Modal>
      </div>
      <FolderFrame></FolderFrame>
      <PhotoFrame photos={Photo101} query={props.query}></PhotoFrame>
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string
};
