import './services/axios/mockAdapter/createMockApis';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TablePage from './Page/Table.page';

import { ThemeContextProvider } from './contexts/muiThemeProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <TablePage />
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}

export default App;
