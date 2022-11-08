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
export default function Progressbar(props) {
  return (
    <Box>
      <SidebarContainer>
        <Box sx={{ width: '80%', mr: 1, border: 'solid 1px', borderRadius: '5px' }}>
          <LinearProgress
            sx={{ backgroundColor: 'white' }}
            color="info"
            variant="determinate"
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: '80px' }}>
          <Typography variant="body2">{`${props.value}% used`}</Typography>
        </Box>
      </SidebarContainer>
    </Box>
  );
}

Progressbar.propTypes = {
  value: PropTypes.number
};
