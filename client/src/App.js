import React from 'react';
// import Sidebar from './components/Dashboard/Sidebar';
// import Feed from './components/Dashboard/Feed';
// import { Box, Stack } from '@mui/material';
// import Navbar from './components/Dashboard/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

//import { Route, Routes } from 'react-router-dom';

// import components here

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
