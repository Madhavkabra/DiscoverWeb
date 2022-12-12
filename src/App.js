import "./services/axios/mockAdapter/createMockApis";
import React, { useState, createContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TablePage from "./Page/Table.page";
import "./App.css";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
