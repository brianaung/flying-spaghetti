import React from 'react';
import PropTypes from 'prop-types';
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

export default function SearchBar({ query, setQuery }) {
  return (
    <Search>
      <InputBase value={query} placeholder="SEARCH" onChange={(e) => setQuery(e.target.value)} />
    </Search>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func
};
