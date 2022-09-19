import React from 'react';

import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { Box, Stack } from '@mui/material';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={2}>
        <Sidebar></Sidebar>
        <Feed></Feed>
      </Stack>
    </Box>
  );
};

export default Dashboard;
