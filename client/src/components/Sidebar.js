import React, { useContext } from 'react';
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

const StyledListItemBtn = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
    color: 'black'
  }
}));

// const selected = localStorage.getItem('selected') ? localStorage.getItem('selected') : '0';
export default function Sidebar() {
  const { id } = useParams();
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(id);

  const handleListItemClick = (idx) => {
    console.log(user);
    setSelectedIndex(idx);
    navigate(`/dashboard/${idx}`);
  };

  return (
    <SidebarContainer>
      <Stack>
        <WelcomeMsg variant="h3">G&apos;day {user.firstName}</WelcomeMsg>

        <StyledListItemBtn
          selected={selectedIndex === 'folders'}
          onClick={() => handleListItemClick('folders')}>
          <ListItemText primary="My Photos" />
        </StyledListItemBtn>

        <StyledListItemBtn
          selected={selectedIndex === 'shared'}
          onClick={() => handleListItemClick('shared')}>
          <ListItemText primary="Shared With Me" />
        </StyledListItemBtn>

        <StyledListItemBtn
          selected={selectedIndex === 'liked'}
          onClick={() => handleListItemClick('liked')}>
          <ListItemText primary="Liked" />
        </StyledListItemBtn>

        {user.role === 'admin' && (
          <StyledListItemBtn
            selected={selectedIndex === 'users'}
            onClick={() => handleListItemClick('users')}>
            <ListItemText primary="Manage Users" />
          </StyledListItemBtn>
        )}
      </Stack>

      <Progressbar value={100 - user.capacity} />
    </SidebarContainer>
  );
}
