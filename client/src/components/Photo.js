import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { movePhotoToBin } from '../actions/photos';
// mui components
import { styled } from '@mui/system';
import {
  Stack,
  Typography,
  Box,
  ImageListItem,
  Button,
  Modal,
  Checkbox,
  Tooltip,
  IconButton
} from '@mui/material';
//icons
import { Comment, Trash, Link, Heart } from '@styled-icons/evil';
import { Favorite } from '@styled-icons/material-rounded';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const StyledImgListItem = styled(ImageListItem)({
  width: '250px',
  overflow: 'hidden',
  borderBottom: 'solid 2px black',
  aspectRatio: '1/1'
});

const LinkBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexDirection: 'column'
});

const ImageLink = styled(Box)({
  border: '1px ridge',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px'
});

const PhotoContainer = styled(Stack)({
  border: 'solid 2px black'
});

export default function Photo(props) {
  const [copied, setCopied] = useState(false);

  const [openShare, setOpenShare] = useState(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);

  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openPhoto = () => {
    navigate(`/photo/${props.aPhoto.id}`);
  };

  let folderID = useParams().id;
  if (folderID === 'folders') {
    folderID = 'root';
  }

  return (
    <div>
      <PhotoContainer>
        <StyledImgListItem onClick={openPhoto}>
          <img src={props.aPhoto.link} alt={props.aPhoto.name} />
        </StyledImgListItem>

        <Box sx={{ padding: '5px 12px' }}>
          <Typography variant="body1" color="primary" sx={{ textTransform: 'uppercase' }}>
            {props.aPhoto.name}
          </Typography>
          <Typography variant="body2" color="primary" sx={{ textTransform: 'lowercase' }}>
            {props.aPhoto.caption}
          </Typography>
        </Box>

        {/* like, comment, share buttons */}
        <Stack direction="row" sx={{ width: '100%' }}>
          <Checkbox
            sx={{ color: 'black' }}
            color="error"
            icon={<Heart size="30" />}
            checkedIcon={<Favorite size="30" />}
          />

          <IconButton size="small" color="primary" onClick={() => {}}>
            <Comment size="30" />
          </IconButton>

          <IconButton size="small" color="primary" onClick={handleOpenShare}>
            <Link size="30" />
          </IconButton>

          <IconButton sx={{ marginLeft: 'auto' }} color="primary" onClick={handleOpenDel}>
            <Trash size="30" />
          </IconButton>
        </Stack>
      </PhotoContainer>

      {/* image link */}
      <Modal
        open={openShare}
        onClose={handleCloseShare}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <LinkBox>
          <Typography align="center">Image Link</Typography>
          <ImageLink>
            {props.aPhoto.link}
            <Box display="flex" justifyContent="flex-end" marginTop="1rem">
              <Tooltip title={copied ? 'Link copied!' : 'Click to copy'} placement="left">
                <Checkbox
                  onClick={() => {
                    navigator.clipboard.writeText(props.aPhoto.link);
                    setCopied(!copied);
                  }}
                  icon={<LibraryAddCheckOutlinedIcon fontSize="medium" />}
                  checkedIcon={<LibraryAddCheckIcon />}
                />
              </Tooltip>
            </Box>
          </ImageLink>
        </LinkBox>
      </Modal>

      {/* delete confirmation box */}
      <Modal open={openDel} onClose={handleCloseDel}>
        <LinkBox>
          <Typography align="center">Are you sure you want to delete this photo?</Typography>
          <Stack direction="row" gap={2}>
            <Button
              sx={{ border: 'solid 2px black' }}
              variant="contained"
              color="error"
              onClick={() => dispatch(movePhotoToBin(folderID, props.aPhoto.photoID))}>
              Yes
            </Button>
            <Button
              sx={{ border: 'solid 2px black' }}
              variant="contained"
              color="primary"
              onClick={handleCloseDel}>
              No
            </Button>
          </Stack>
        </LinkBox>
      </Modal>
    </div>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};
