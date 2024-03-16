import React from "react";
import { Outlet } from "react-router-dom";

import "./home-layout.scss";
import SideBar from "../../components/shared/side-bar/SideBar";

const HomeLayout = () => {
  return (
    <>
      <main className="main">
        <SideBar className="side-bar" />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
