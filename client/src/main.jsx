import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import "./index.scss";
import RootLayoutPage, { rootAction } from "./pages/layouts/RootLayoutPage";
import HomePage from "./pages/home/HomePage";
import store from "./features/store";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NewsFeed from "./pages/newsfeed/NewsFeed";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    action: rootAction,
    element: <RootLayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          // {
          //   path: "chat/:context",
          //   children: [
          //     {
          //       path: ":id",
          //       loader: chatLoader,
          //       element: <ChatContainer />
          //     }
          //   ]
          // },
          {
            path: "newsfeed/:id",
            element: <NewsFeed />
          }
        ]
      },
    ],
  },
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

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
