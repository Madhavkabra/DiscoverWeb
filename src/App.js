import './services/axios/mockAdapter/createMockApis';
import React, { useState, createContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TablePage from './Page/Table.page';

import { ThemeMode } from './constants/themeMode';

const queryClient = new QueryClient();

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = useState(ThemeMode.LIGHT);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <TablePage />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
