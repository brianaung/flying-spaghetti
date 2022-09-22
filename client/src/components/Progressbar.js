import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const SidebarContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '80%',
  margin: '20px auto'
});

// LinearProgressWithLabel from MUI
export default function UsageIndicator(props) {
  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }} variant="body1">
        Usage
      </Typography>
      <SidebarContainer>
        <Box sx={{ width: '80%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </SidebarContainer>
    </Box>
  );
}

UsageIndicator.propTypes = {
  value: PropTypes.number.isRequired
};
