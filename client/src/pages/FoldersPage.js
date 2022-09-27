import React from 'react';

import styled from '@emotion/styled';

import { Stack } from '@mui/system';

//components
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
//import CircularProgress from '@mui/material/CircularProgress';

const FullPage = styled(Stack)({
  display: 'flex',
  flexDirection: 'row'
});

const MainSection = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  margin: '40px',
  height: '40rem',
  gap: '40px'
});

export default function FoldersPage() {
  return (
    <>
      <Navbar />

      <FullPage>
        <Sidebar />
        <MainSection></MainSection>
      </FullPage>
    </>
  );
}
