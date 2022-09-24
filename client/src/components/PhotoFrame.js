import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
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
        {props.photos
          .filter((photo) => photo.name.toLowerCase().includes(props.query))
          .map((aPhoto) => {
            return <Photo key={aPhoto.id} aPhoto={aPhoto}></Photo>;
          })}
      </PhotoContainer>
    </>
  );
}

PhotoFrame.propTypes = {
  photos: PropTypes.object,
  query: PropTypes.string
};
