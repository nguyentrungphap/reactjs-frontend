import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="body-wrapper">
      <h1>day la main</h1>
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
