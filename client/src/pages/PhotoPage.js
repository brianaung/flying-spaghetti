import React from 'react';

import { Box, Stack } from '@mui/material';
import PhotoCmt from '../components/PhotoCmt';
import Comments from '../components/Comments';

function PhotoPage() {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <PhotoCmt></PhotoCmt>
        <Comments></Comments>
      </Stack>
    </Box>
  );
}

export default PhotoPage;
