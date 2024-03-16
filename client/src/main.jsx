import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.scss";
import RootLayoutPage, { rootAction } from "./pages/layouts/RootLayoutPage";
import HomePage from "./pages/home/HomePage";
import store from "./features/store";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NewsFeed from "./pages/newsfeed/NewsFeed";
import HomeLayout from "./pages/layouts/HomeLayout";
import ChatContainer from "./components/chat-container/ChatContainer";
import Header from "./components/shared/header/Header";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    action: rootAction,
    element: <RootLayoutPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            path: "chat",
            element: <ChatContainer />,
          },

          {
            path: "newsfeed/:id",
            element: <NewsFeed />,
          },
        ],
      },
      {
        path: "/user",
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
