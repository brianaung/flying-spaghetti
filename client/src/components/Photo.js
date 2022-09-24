import React, { useState } from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import {
  Typography,
  Stack,
  Box,
  ImageListItem,
  Button,
  Modal,
  Checkbox,
  Tooltip
} from '@mui/material';

//mui icons
import Favorite from '@mui/icons-material/Favorite';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const StyledImgListItem = styled(ImageListItem)({
  border: 'solid 2px black',
  width: '250px',
  overflow: 'hidden',
  aspectRatio: '1/1'
});

const LabelContainer = styled(Stack)({
  padding: '20px',
  gap: '20px',
  border: 'solid 2px black',
  width: '250px',
  overflow: 'scroll',
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

function Label(props) {
  return (
    <LabelContainer>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        {props.name}
      </Typography>
      <Typography>{props.caption}</Typography>
    </LabelContainer>
  );
}

Label.propTypes = {
  name: PropTypes.string,
  caption: PropTypes.string
};

export default function Photo(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <Box onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
        {/* show image label (name, user, caption) on hover */}
        {isHovered ? (
          <Label name={props.aPhoto.name} caption={props.aPhoto.caption} />
        ) : (
          <StyledImgListItem>
            <img src={props.aPhoto.photo} alt={props.aPhoto.name} />
          </StyledImgListItem>
        )}
      </Box>

      {/* like, comment, share buttons */}
      <Box display="flex" justifyContent="space-between">
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
        <Button size="small" color="primary" onClick={() => {}}>
          <ChatBubbleOutlineOutlinedIcon fontSize="medium" />
        </Button>
        <Button size="small" color="primary" onClick={handleOpen}>
          <ShareIcon fontSize="medium" />
        </Button>
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
