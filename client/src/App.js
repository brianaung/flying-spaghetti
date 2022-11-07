import { React, useState, useMemo, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
// my components
import Dashboard from './pages/Dashboard';
import PhotoPage from './pages/PhotoPage';
import Home from './pages/Home';
import Register from './pages/Register';
// mui theme
import { ThemeProvider, createTheme } from '@mui/material';
import { getDesignTokens } from './theme';

const PrivateRoutes = (props) => {
  const user = useContext(UserContext);
  // TODO: handle alert for banned and pending users here?
  /* useEffect(() => {
    if (user.role === 'admin') {
      alert("Testing 1 2");
    }
  }, []); */
  return user && (user.role === 'user' || user.role === 'admin') ? (
    props.children
  ) : (
    <Navigate to="/" />
  );
};
PrivateRoutes.propTypes = {
  children: PropTypes.element
};

/* prevent loggedin users from accessing the home page */
const PublicRoutes = (props) => {
  const user = useContext(UserContext);
  const session = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  // if user is logged in (or session has user info), then go to dashboard
  // else show the home page
  return session && user && (user.role === 'user' || user.role === 'admin') ? (
    <Navigate to="/dashboard/folders" />
  ) : (
    props.children
  );
};
PublicRoutes.propTypes = {
  children: PropTypes.element
};

// get the current logged in user
let savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// contexts
export const UserContext = createContext(savedUser);
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
  const [user, setUser] = useState(savedUser);

  const savedMode = localStorage.getItem('colorMode') ? localStorage.getItem('colorMode') : 'light';
  const [mode, setMode] = useState(savedMode);
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  /*
  // navigate user after loggin in
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'user':
          navigate('/dashboard/folders');
          break;
        case 'admin':
          navigate('/dashboard/folders');
          break;
        case 'pending':
          alert('Please wait for the admin to approve your registration');
          localStorage.clear();
          break;
        case 'banned':
          alert('You have been banned from using this service');
          localStorage.clear();
          break;
      }
    }
  }, []);
  */

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <PublicRoutes>
                  <Home handleLogin={setUser} />
                </PublicRoutes>
              }
            />

            <Route path="/register" exact element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/dashboard/:id"
              exact
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            />

            <Route
              path="/photo/:id"
              exact
              element={
                <PrivateRoutes>
                  <PhotoPage />
                </PrivateRoutes>
              }
            />
          </Routes>
        </UserContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
