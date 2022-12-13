import React, { useContext, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import { CreateThemeContext } from '../../../contexts/muiThemeProvider';
import { ThemeMode } from '../../../constants/themeMode';

export const ToggleThemeMode = () => {
  const { toggleThemeMode } = useContext(CreateThemeContext);
  const theme = useTheme();

  const renderThemeModeIcon = useMemo(
    () =>
      theme.palette.mode === ThemeMode.DARK ? (
        <LightModeIcon />
      ) : (
        <DarkModeIcon />
      ),
    [theme.palette.mode]
  );

  return (
    <Box
      sx={{
        marginBottom: 2,
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
      }}
    >
      <IconButton
        sx={{ margin: '20px' }}
        onClick={toggleThemeMode}
        variant='contained'
      >
        {renderThemeModeIcon}
      </IconButton>
    </Box>
  );
};
