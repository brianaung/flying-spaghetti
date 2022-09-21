import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Photo({ aPhoto }) {
  return (
    <Box
      paddingRight={'50px'}
      paddingTop={'50px'}
      whiteSpace={0}
      display={'flex'}
      flexDirection={'column'}>
      <img src={aPhoto.photo} alt={aPhoto.name} width="200px" height="200px" />
      <a style={{ border: '1px ridge', padding: '0.5rem', textAlign: 'center' }}>{aPhoto.name}</a>
    </Box>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};

export default Photo;
