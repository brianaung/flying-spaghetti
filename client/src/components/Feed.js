import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

import Folders from '../components/Folders';
import Photos from '../components/Photos';
//import { Photofolders } from '../data/photo-data';
import { Photo101 } from '../data/photo-data';
// import { Users } from '../data/photo-data';

const Feed = ({ query }) => {
  return (
    <Stack flex={8} padding="20px" spacing={3}>
      <Box>
        <Typography variant="h5">Share with me</Typography>
      </Box>
      <Stack>
        <Folders></Folders>
        <Photos photos={Photo101} query={query}></Photos>
      </Stack>
    </Stack>
  );
};

Feed.propTypes = {
  query: PropTypes.string
};

export default Feed;
