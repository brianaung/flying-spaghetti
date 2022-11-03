import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
// data
import { UserContext } from '../App';
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
  backgroundColor: theme.palette.background.main,
  borderRight: 'solid 1px',
  borderColor: theme.palette.divider,
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'flex-start',
  width: '20%',
  // TODO: toggle off sidebar in mobile view
  minWidth: '300px',
  padding: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRight: '0px',
    borderBottom: 'solid 1px',
    borderColor: theme.palette.divider
  }
}));

// const selected = localStorage.getItem('selected') ? localStorage.getItem('selected') : '0';
export default function Sidebar(props) {
  const { id } = useParams();
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(id);

  const handleListItemClick = (idx) => {
    setSelectedIndex(idx);
  };

  return (
    <SidebarContainer>
      <Stack>
        <WelcomeMsg variant="h3">G&apos;day {user.firstName}</WelcomeMsg>

        <ListItemButton
          selected={selectedIndex === 'folders'}
          onClick={() => handleListItemClick('folders')}>
          <ListItemText primary="My Photos" onClick={() => navigate('/dashboard/folders')} />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 'shared'}
          onClick={() => handleListItemClick('shared')}>
          <ListItemText primary="Shared With Me" onClick={() => navigate('/dashboard/shared')} />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 'liked'}
          onClick={() => handleListItemClick('liked')}>
          <ListItemText primary="Liked" onClick={() => navigate('/dashboard/liked')} />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 'trash'}
          onClick={() => handleListItemClick('trash')}>
          <ListItemText primary="Trash" onClick={() => navigate('/dashboard/trash')} />
        </ListItemButton>
      </Stack>

      <Progressbar value={props.usage} />
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  usage: PropTypes.number
};
