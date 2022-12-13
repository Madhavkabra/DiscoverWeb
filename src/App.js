import './services/axios/mockAdapter/createMockApis';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Paper from '@mui/material/Paper';

import TablePage from './pages/Table';
import { ThemeContextProvider } from './contexts/muiThemeProvider';
import { ToggleThemeMode } from './mui/components/ToggleThemeMode';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeContextProvider>
      <Paper sx={{ height: '100vh', borderRadius: 0 }}>
        <ToggleThemeMode />
        <QueryClientProvider client={queryClient}>
          <TablePage />
        </QueryClientProvider>
      </Paper>
    </ThemeContextProvider>
  );
}

export default App;
