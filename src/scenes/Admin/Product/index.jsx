import React from "react";

import { Outlet } from "react-router-dom";
import UploadImage from "../../../utils/UploadImage/Index";

function AdminProduct() {
  return (
    <div>
      <Outlet />
      <UploadImage />
    </div>
  );
}

export default AdminProduct;
