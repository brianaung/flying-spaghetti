import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// my components
import Progressbar from './Progressbar';

const WelcomeMsg = styled(Typography)({
  textAlign: 'center',
  fontWeight: '600',
  padding: '20px 20px 40px 20px'
});

const SidebarContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'flex-start',
  width: '20%',
  // TODO: toggle off sidebar in mobile view
  minWidth: '300px',
  borderRight: 'solid 1px lightgrey',
  padding: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRight: '0px',
    borderBottom: 'solid 1px lightgrey'
  }
}));

export default function Sidebar(props) {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SidebarContainer>
      <Stack>
        <WelcomeMsg variant="h3">G&apos;day {props.user.firstName}</WelcomeMsg>

        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemText primary="My Photos" onClick={() => navigate('/dashboard/folders')} />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
          <ListItemText primary="Shared With Me" onClick={() => navigate('/dashboard/folders')} />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
          <ListItemText primary="Liked" onClick={() => navigate('/dashboard/folders')} />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
          <ListItemText primary="Trash" onClick={() => navigate('/dashboard/folders')} />
        </ListItemButton>
      </Stack>

      <Progressbar value={props.usage} />
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object,
  usage: PropTypes.number.isRequired
};
