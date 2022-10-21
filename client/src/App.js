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
  return props.user && (props.user.role === 'user' || props.user.role === 'admin') ? (
    props.children
  ) : (
    <Navigate to="/" />
  );
};
PrivateRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element
};

// get the current logged in user
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export default function App() {
  const [user, setUser] = useState(savedUser);

  return (
    <>
      <Routes>
        {/* TODO: prevent logged in user from accessing login page? */}
        <Route path="/" exact element={<Home handleLogin={setUser} />} />

        <Route path="/register" exact element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard/:id"
          exact
          element={
            <PrivateRoutes user={user}>
              <Dashboard user={user} />
            </PrivateRoutes>
          }
        />

        <Route
          path="/photo/:id"
          exact
          element={
            <PrivateRoutes user={user}>
              <PhotoPage user={user} />
            </PrivateRoutes>
          }
        />

      </Routes>
    </>
  );
}
