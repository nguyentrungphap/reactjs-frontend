import React from "react";
import Sidebar from "./components/Sidebar";
import Main from "../../scenes/Admin/Main";

const Admin = () => {
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <Sidebar />
      <Main />
    </div>
  );
};

export default Admin;
