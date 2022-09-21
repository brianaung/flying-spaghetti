import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Photo({ aPhoto }) {
  return (
    <Box paddingRight={'50px'} paddingTop={'50px'}>
      <img src={aPhoto.photo} alt={aPhoto.name} width="200px" height="200px" />
    </Box>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};

export default Photo;
