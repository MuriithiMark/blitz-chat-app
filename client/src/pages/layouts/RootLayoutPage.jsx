import React from "react";
import { Outlet } from "react-router-dom";

import "./root-layout-page.scss";
import Header from "../../components/shared/header/Header";
import useAuthenticatedUser from "../../hooks/use-authenticated-user.hook";

export const rootAction = async ({ request, params}) => {

}

const RootLayoutPage = () => {

  useAuthenticatedUser();
  
  return (
    <>
      <Header className="header" />
      <Outlet />
    </>
  );
};

export default RootLayoutPage;
