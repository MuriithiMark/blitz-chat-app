import React from "react";
import { Outlet } from "react-router-dom";

import "./root-layout-page.scss";
import Header from "../../components/shared/header/Header";

const RootLayoutPage = () => {

  return (
    <>
      <Header className="header" />
      <Outlet />
    </>
  );
};

export default RootLayoutPage;
