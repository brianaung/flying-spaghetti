import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled, Stack, Typography, ImageList } from '@mui/material';
// my components
import Photo from './Photo';

const PhotoContainer = styled(ImageList)(({ theme }) => ({
  justifyItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    width: '100%'
  }
}));

export default function PhotoFrame(props) {
  return (
    <Stack gap={2}>
      <Typography variant="h3">Photos</Typography>
      <PhotoContainer gap={20}>
        {/* filter search queries */}

        {/* implement later */}
        {props.photos
          ? props.photos
              .filter((photo) => photo.name.toLowerCase().includes(props.query))
              .map((aPhoto) => {
                return <Photo key={aPhoto.id} aPhoto={aPhoto}></Photo>;
              })
          : ''}
      </PhotoContainer>
    </Stack>
  );
}

PhotoFrame.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.string
};
