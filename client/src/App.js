import React from 'react';
import Sidebar from './components/Dashboard/Sidebar';
import Feed from './components/Dashboard/Feed';
import { Box, Stack } from '@mui/material';
import Navbar from './components/Dashboard/Navbar';

//import { Route, Routes } from 'react-router-dom';

// import components here

function App() {
  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={2}>
        <Sidebar></Sidebar>
        <Feed></Feed>
      </Stack>
    </Box>
  );
}

export default App;
