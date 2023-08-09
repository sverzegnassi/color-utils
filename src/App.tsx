import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const ThemeGeneratorPage = lazy(() => import("./pages/ThemeGenerator.tsx"));

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<ThemeGeneratorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
