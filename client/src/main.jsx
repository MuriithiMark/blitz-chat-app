import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./index.scss";
import RootLayoutPage, { rootAction } from "./pages/layouts/RootLayoutPage";
import store from "./features/store";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NewsFeed from "./pages/newsfeed/NewsFeed";
import ChatContainer from "./components/chat-container/ChatContainer";
import Header from "./components/shared/header/Header";
import ChatLayout from "./pages/chat/ChatLayout";
import UsersPage from "./pages/users/UsersPage";
import TestPage from "./pages/test/TestPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    action: rootAction,
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
    ],
  },
  {
    path: "/auth",
    element: <RootLayoutPage />,
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
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "*",
    element: (
      <>
        <Header />
        <div>Error 404, Not Found</div>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
