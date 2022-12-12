import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TablePage from "./Page/Table.page";
import "./App.css";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

import './services/axios/mockAdapter/createMockApis';

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <TablePage />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
