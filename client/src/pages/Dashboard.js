import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { Box, Stack } from '@mui/material';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [query, setQuery] = useState('');

  return (
    <Box>
      <Navbar query={query} setQuery={setQuery}></Navbar>
      <Stack direction="row" spacing={2}>
        <Sidebar></Sidebar>
        <Feed query={query}></Feed>
      </Stack>
    </Box>
  );
};

export default Dashboard;
