import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhotos, getPhotosInFolder, getSharedPhotos, getLikedPhotos } from '../actions/photos';
import { getAllUsers } from '../actions/users';
// mui components
import { styled, Box, Stack } from '@mui/material';
// my components
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import UsersList from '../components/UsersList';

const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  flexGrow: '1',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id === 'folders') {
      dispatch(getPhotos());
    } else if (id === 'shared') {
      dispatch(getSharedPhotos());
    } else if (id === 'liked') {
      dispatch(getLikedPhotos());
    } else if (id === 'users') {
      dispatch(getAllUsers());
    } else {
      dispatch(getPhotosInFolder(id));
    }
  }, [id]);

  return (
    <Container container>
      <Navbar query={query} setQuery={setQuery} />
      <StyledStack direction="row">
        <Sidebar />
        {id === 'users' ? (
          <UsersList />
        ) : (
          <Feed query={query} pageID={id} />
        )}
      </StyledStack>
    </Container>
  );
}
