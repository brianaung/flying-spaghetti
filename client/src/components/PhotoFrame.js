import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import ImageList from '@mui/material/ImageList';

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
      <PhotoContainer gap={20}>
        {/* filter search queries */}

        {/* implement later */}
        {props.photos
          ? props.photos
              .filter((photo) => photo.caption.toLowerCase().includes(props.query))
              .map((aPhoto) => {
                return <Photo key={aPhoto.photoID} aPhoto={aPhoto}></Photo>;
              })
          : ''}
      </PhotoContainer>
    </>
  );
}

PhotoFrame.propTypes = {
  photos: PropTypes.object,
  query: PropTypes.string
};
