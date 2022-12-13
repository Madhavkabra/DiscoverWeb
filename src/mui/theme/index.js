import { createTheme } from '@mui/material';

export const getMuiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
    },
  });
