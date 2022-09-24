import React from 'react';
// import Sidebar from './components/Dashboard/Sidebar';
// import Feed from './components/Dashboard/Feed';
// import { Box, Stack } from '@mui/material';
// import Navbar from './components/Dashboard/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PhotoPage from './pages/PhotoPage';
import Home from './pages/Home';

//import { Route, Routes } from 'react-router-dom';

// import components here

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* TODO: Home is the main pg for non users. Dashboard is the home page for logged in users */}
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/photo" exact element={<PhotoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
