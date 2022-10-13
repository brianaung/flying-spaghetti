import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled, Typography, ImageList } from '@mui/material';
// my components
import Photo from './Photo';

const PhotoContainer = styled(ImageList)({
  justifyItems: 'center',
  display: 'flex',
  flexWrap: 'wrap'
});

export default function PhotoFrame(props) {
  return (
    <>
      <Typography variant="h3">Photos</Typography>
      <PhotoContainer gap={20}>
        {/* filter search queries */}

        {/* implement later */}
        {props.photos
          ? props.photos
              .filter((photo) => photo.name.toLowerCase().includes(props.query))
              .map((aPhoto) => {
                return <Photo key={aPhoto.photoID} aPhoto={aPhoto}></Photo>;
              })
          : ''}
      </PhotoContainer>
    </>
  );
}

PhotoFrame.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.string
};
