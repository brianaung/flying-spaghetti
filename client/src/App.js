import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import Sidebar from './components/Dashboard/Sidebar';
// import Feed from './components/Dashboard/Feed';
import { Button } from '@mui/material';
// import Navbar from './components/Dashboard/Navbar';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PhotoPage from './pages/PhotoPage';
import Home from './pages/Home';
import FoldersPage from './pages/FoldersPage';
import Register from './pages/Register';
// import AuthGuard from './components/AuthGuard';

//import { Route, Routes } from 'react-router-dom';

// import components here

const PrivateRoutes = ({ user, children }) => {
  return user ? children : <Navigate to="/" />;
};

PrivateRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element
};

const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export default function App() {
  const [user, setUser] = useState(savedUser);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <>
      <Button
        onClick={() => {
          localStorage.clear();
          navigate('/');
        }}>
        Logout
      </Button>
      <Routes>
        {/* TODO: Home is the main pg for non users. Dashboard is the home page for logged in users */}
        <Route path="/" exact element={<Home handleLogin={setUser} />} />
        <Route path="/register" exact element={<Register />} />
        <Route
          path="/dashboard/:id"
          exact
          element={
            <PrivateRoutes user={JSON.parse(localStorage.getItem('user'))}>
              <Dashboard user={JSON.parse(localStorage.getItem('user'))} />
            </PrivateRoutes>
          }
        />
        <Route
          path="/photo/:id"
          exact
          element={
            <PrivateRoutes user={JSON.parse(localStorage.getItem('user'))}>
              <PhotoPage />
            </PrivateRoutes>
          }
        />
        <Route path="/dashboard/:id" exact element={<FoldersPage />} />
      </Routes>
    </>
  );
}
