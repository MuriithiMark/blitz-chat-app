import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/layouts/root-layout/RootLayout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<h1>Hello World</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
