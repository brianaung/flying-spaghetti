import React, { useEffect, useState } from 'react';
// mui components
import { styled, Box, Stack } from '@mui/material';
// my components
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';

//actions
import { getPhotos } from '../actions/photos';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
});

const StyledStack = styled(Stack)(({ theme }) => ({
  flexGrow: '1',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <Container container>
      <Navbar query={query} setQuery={setQuery} />
      <StyledStack direction="row">
        <Sidebar usage="90" />
        <Feed query={query} />
      </StyledStack>
    </Container>
  );
}
