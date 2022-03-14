import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { SnackbarProvider } from "notistack";

import WorkflowScreen from "./Screens/Workflow";
import LoadingScreen from "./Screens/LoadingScreen";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

const App = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container disableGutters maxWidth="lg">
          <SnackbarProvider maxSnack={1}>
            <Router>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route exact path="/" element={<WorkflowScreen />} />
                </Routes>
              </Suspense>
            </Router>
          </SnackbarProvider>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
