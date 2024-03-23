import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/layouts/root-layout/RootLayout.tsx";
import ChatContainer from "./components/chat/chat-container/ChatContainer.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<ChatContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
