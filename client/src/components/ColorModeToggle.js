import React, { useContext } from 'react';
import {
  useTheme,
  // styled,
  IconButton
} from '@mui/material';
import { ColorModeContext } from '../App';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorModeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.background.main
      }}>
      <IconButton
        sx={{
          ml: 1,
          color: theme.palette.text.primary
        }}
        onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <LightModeIcon /> : <NightsStayIcon />}
      </IconButton>
    </div>
  );
}
