import React, { useState } from 'react';
// mui components
import { styled, Box, Stack } from '@mui/material';
// my components
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
});

const StyledStack = styled(Stack)({
  flexGrow: '1'
});

export default function Dashboard() {
  const [query, setQuery] = useState('');

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
