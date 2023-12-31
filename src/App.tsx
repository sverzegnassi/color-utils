import { lazy } from "react";
import { HashRouter, Route, Routes, Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const ThemeGeneratorPage = lazy(() => import("./pages/ThemeGenerator.tsx"));
const RandomNeutralColorPage = lazy(() => import("./pages/RandomNeutralColor.tsx"));

function PageLayout() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            color-utils{pathname}
          </Typography>
          {pathname !== "/" && (
            <Button color="inherit" component={RouterLink} to="/">
              Theme Generator
            </Button>
          )}
          {pathname !== "/random-neutral" && (
            <Button color="inherit" component={RouterLink} to="/random-neutral">
              Random Neutral Color
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <HashRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<ThemeGeneratorPage />} />
            <Route path="/random-neutral" element={<RandomNeutralColorPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
