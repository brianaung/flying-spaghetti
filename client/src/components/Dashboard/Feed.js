import { Box, Typography } from '@mui/material';
import React from 'react';

const Feed = () => {
  return (
    <Box bgcolor="red" flex={8} justifyContent="center" padding="20px 50px">
      <Box>
        <Typography variant="h5">Share with me</Typography>
      </Box>
    </Box>
  );
};

export default Feed;
