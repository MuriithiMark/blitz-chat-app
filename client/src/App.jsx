import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import RootLayoutPage from "./pages/layouts/RootLayoutPage";
import NewsFeed from "./pages/newsfeed/NewsFeed";
import ChatLayout from "./pages/chat/ChatLayout";
import ChatContainer from "./components/chat-container/ChatContainer";
import UsersPage from "./pages/users/UsersPage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import ModalsProvider from "./components/modals/ModalsProvider";

const App = () => {
  return (
    <BrowserRouter>
      <ModalsProvider />
      <Routes>
        <Route path="/" element={<RootLayoutPage />}>
          <Route path="/" element={<NewsFeed />}>
            <Route path="newsfeed/:id" element={<NewsFeed />} />
          </Route>
          <Route path="/chat" element={<ChatLayout />}>
            <Route
              path=":context/:contextId"
              element={<ChatContainer />}
            />
          </Route>
          <Route path="/users" element={<UsersPage />}>
            <Route path=":userId" element={<h1>User Details</h1>} />
          </Route>
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
