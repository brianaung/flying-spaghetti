import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'black',
  margin: '10px auto',
  padding: '10px',
  border: 'solid 2px black',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    border: 'solid 2px black',
    color: 'white'
  }
}));

export default function SubmitBtn(props) {
  return (
    <StyledButton variant="contained">
      {props.content}
      <input hidden accept="image/*" multiple type="file" />
    </StyledButton>
  );
}

SubmitBtn.propTypes = {
  content: PropTypes.string
};
