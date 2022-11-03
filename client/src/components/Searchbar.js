import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.background.main,
  borderRadius: theme.shape.borderRadius,
  border: 'solid 1px',
  // borderColor: theme.palette.primary.main,
  width: '200px',
  marginRight: 'auto',
  padding: '0 10px'
}));

export default function SearchBar(props) {
  return (
    <Search>
      <InputBase
        value={props.query}
        placeholder="SEARCH"
        onChange={(e) => props.setQuery(e.target.value)}
      />
    </Search>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func
};
