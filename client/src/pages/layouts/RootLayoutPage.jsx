import React from "react";
import { Outlet } from "react-router-dom";

import "./root-layout-page.scss";
import Header from "../../components/shared/header/Header";
import SideBar from "../../components/shared/side-bar/SideBar";

const RootLayoutPage = () => {
  return (
    <>
      <Header className="header" />
      <main className="main">
        <SideBar className="side-bar" />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default RootLayoutPage;
