import React, { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';

import { CreateThemeContext } from './createThemeContext';
import { getMuiTheme } from '../../mui/theme';
import { ThemeMode } from '../../constants/themeMode';

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(ThemeMode.LIGHT);

  const toggleThemeMode = useCallback(() => {
    setMode((prevMode) =>
      prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    );
  }, [setMode]);

  const theme = useMemo(() => getMuiTheme(mode), [mode]);

  return (
    <CreateThemeContext.Provider value={{ toggleThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CreateThemeContext.Provider>
  );
};
