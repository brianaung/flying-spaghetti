import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import Folders from '../components/Folders';
import Photos from '../components/Photos';
//import { Photofolders } from '../data/photo-data';
import { Photo101 } from '../data/photo-data';
// import { Users } from '../data/photo-data';

const Feed = () => {
  useEffect(() => {
    console.log(Photo101);
  });
  return (
    <Stack flex={8} padding="20px" spacing={3}>
      <Box>
        <Typography variant="h5">Share with me</Typography>
      </Box>
      <Stack>
        <Folders></Folders>
        <Photos photos={Photo101}></Photos>
      </Stack>
    </Stack>
  );
};

export default Feed;
