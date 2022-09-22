import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import ImageListItem from '@mui/material/ImageListItem';

const StyledImgListItem = styled(ImageListItem)({
  border: 'solid 2px black',
  width: '250px',
  overflow: 'hidden',
  aspectRatio: '1/1'
});

function Photo({ aPhoto }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <StyledImgListItem>
      <img
        src={aPhoto.photo}
        alt={aPhoto.name}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{ opacity: isShown && '0.2' }}
      />
      {isShown && (
        <>
          <Typography
            variant="h5"
            style={{ position: 'absolute', top: '35%', left: '10%', right: '20%' }}>
            {aPhoto.name}
          </Typography>
          <Typography
            variant="h7"
            style={{ position: 'absolute', top: '50%', left: '10%', right: '30%' }}>
            {aPhoto.caption.length >= 100 ? `${aPhoto.caption.slice(0, 50)}...` : aPhoto.caption}
          </Typography>
        </>
      )}
    </StyledImgListItem>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};

export default Photo;
