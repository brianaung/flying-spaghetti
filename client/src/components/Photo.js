import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// mui components
import { styled } from '@mui/system';
import { Typography, Box, ImageListItem, Button, Modal, Checkbox, Tooltip } from '@mui/material';

//mui icons
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const StyledImgListItem = styled(ImageListItem)({
  width: '250px',
  overflow: 'hidden',
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
  flexDirection: 'column'
});

const ImageLink = styled(Box)({
  border: '1px ridge',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px'
});

export default function Photo(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <Box sx={{ border: 'solid 2px black' }}>
        <StyledImgListItem component={Link} to="/photo">
          <img src={props.aPhoto.photo} alt={props.aPhoto.name} />
        </StyledImgListItem>

        <Box sx={{ padding: '10px' }}>
          <Typography color="gray" sx={{ textTransform: 'capitalise' }}>
            {props.aPhoto.user}
          </Typography>
          <Typography sx={{ fontWeight: '600', textTransform: 'uppercase' }}>
            {props.aPhoto.name}
          </Typography>
        </Box>

        {/* like, comment, share buttons */}
        <Box display="flex" justifyContent="space-between">
          <Checkbox size="medium" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          <Button sx={{ marginRight: 'auto' }} color="primary" onClick={() => {}}>
            <ModeCommentOutlinedIcon size="small" fontSize="medium" />
          </Button>
          <Button size="small" color="primary" onClick={handleOpen}>
            <ShareIcon fontSize="medium" />
          </Button>
        </Box>
      </Box>

      {/* image link */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <LinkBox>
          <Typography align="center">Image Link</Typography>
          <ImageLink>
            {props.aPhoto.photo}
            <Box display="flex" justifyContent="flex-end" marginTop="1rem">
              <Tooltip title={copied ? 'Link copied!' : 'Click to copy'} placement="left">
                <Checkbox
                  onClick={() => {
                    navigator.clipboard.writeText(props.aPhoto.photo);
                    setCopied(!copied);
                  }}
                  icon={<LibraryAddCheckOutlinedIcon fontSize="medium" />}
                  checkedIcon={<LibraryAddCheckIcon sx={{ color: 'green' }} />}
                />
              </Tooltip>
            </Box>
          </ImageLink>
        </LinkBox>
      </Modal>
    </div>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};
