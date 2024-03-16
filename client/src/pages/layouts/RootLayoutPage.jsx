import React from "react";
import { Outlet } from "react-router-dom";

import "./root-layout-page.scss";
import Header from "../../components/shared/header/Header";
import useAuthenticatedUser_old from "../../hooks/use-authenticated-user.hook_old";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser.hook";
import { useVerifyTokenQuery } from "../../features/api";
import { useEffect } from "react";

export const rootAction = async ({ request, params }) => {};

const RootLayoutPage = () => {

  return (
    <>
      <Header className="header" />
      <Outlet />
    </>
  );
};

export default RootLayoutPage;
