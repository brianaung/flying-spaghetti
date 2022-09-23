import React, { useState } from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { ImageListItem } from '@mui/material';

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
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};
