import React from 'react';
// mui components
import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  width: '150px',
  marginRight: 'auto',
  padding: '0 10px'
}));

export default function SearchBar() {
  return (
    <Search>
      <InputBase placeholder="SEARCH" />
    </Search>
  );
}
