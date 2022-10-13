import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
// my components
import Dashboard from './pages/Dashboard';
import PhotoPage from './pages/PhotoPage';
import Home from './pages/Home';
import Register from './pages/Register';

// protect routes to only give access to accounts with the role `user`
const PrivateRoutes = (props) => {
  return props.user && props.user.role == 'user' ? props.children : <Navigate to="/" />;
};
PrivateRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element
};

// get the current logged in user
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export default function App() {
  const [user, setUser] = useState(savedUser);

  // store current user state on local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <>
      {/* NOTE: tmp logout button that clears local storage and navigate back to landing page */}
      <Routes>
        {/* TODO: prevent logged in user from accessing login page? */}
        <Route path="/" exact element={<Home handleLogin={setUser} />} />

        <Route path="/register" exact element={<Register />} />

        {/* Protected routes */}
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
              <PhotoPage user={JSON.parse(localStorage.getItem('user'))} />
            </PrivateRoutes>
          }
        />

        {/*
        <Route
          path="/dashboard/:id"
          exact
          element={
            <PrivateRoutes user={JSON.parse(localStorage.getItem('user'))}>
              <FoldersPage user={JSON.parse(localStorage.getItem('user'))} />
            </PrivateRoutes>
          }
        />
      */}
      </Routes>
    </>
  );
}
