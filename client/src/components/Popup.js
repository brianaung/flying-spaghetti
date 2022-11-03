import React from 'react';
import PropTypes from 'prop-types';
import { styled, Box } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: theme.palette.divider,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexDirection: 'column'
}));

export default function Popup(props) {
  return <Container>{props.children}</Container>;
}

Popup.propTypes = {
  children: PropTypes.element
};
