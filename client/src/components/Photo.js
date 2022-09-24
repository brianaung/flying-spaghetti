import React, { useState } from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import { Typography, Stack, Box, ImageListItem, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

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
      <Box display="flex" justifyContent="space-between">
        <Button size="small" color="primary" onClick={() => {}}>
          <FavoriteBorderIcon fontSize="medium" />
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <ChatBubbleOutlineOutlinedIcon fontSize="medium" />
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <ShareIcon fontSize="medium" />
        </Button>
      </Box>
    </div>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};
