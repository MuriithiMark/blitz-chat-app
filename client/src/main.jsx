import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import RootLayoutPage from "./pages/layouts/RootLayoutPage";
import store from "./features/store";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NewsFeed from "./pages/newsfeed/NewsFeed";
import ChatContainer from "./components/chat-container/ChatContainer";
import ChatLayout from "./pages/chat/ChatLayout";
import UsersPage from "./pages/users/UsersPage";
import TestPage from "./pages/test/TestPage";
import NotFoundPage from "./pages/error/NotFoundPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [
      {
        path: "/",
        element: <NewsFeed />,
        children: [
          {
            path: "newsfeed/:id",
            element: <NewsFeed />,
          },
        ],
      },
      {
        path: "/chat",
        element: <ChatLayout />,
        children: [
          {
            path: ":context/:contextId",
            element: <ChatContainer />,
          },
        ],
      },
      {
        path: "/users",
        element: <UsersPage />,
        children: [
          {
            path: ":id",
            element: <h1>User Details</h1>,
          },
        ],
      },
      // Auth Pages
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
        ],
      },

      // Not Found Page
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
