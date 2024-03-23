import { Outlet } from "react-router-dom";

import Header from "../../../components/shared/header/Header.tsx";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
