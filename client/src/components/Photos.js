import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Photo from './Photo';

function Photos({ photos, query }) {
  return (
    <>
      <Typography variant="h6">Photos</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
        {photos
          .filter((photo) => photo.name.toLowerCase().includes(query))
          .map((aPhoto) => {
            return <Photo key={aPhoto.id} aPhoto={aPhoto}></Photo>;
          })}
      </Box>
    </>
  );
}

Photos.propTypes = {
  photos: PropTypes.object,
  query: PropTypes.string
};

export default Photos;
