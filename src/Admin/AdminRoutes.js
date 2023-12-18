import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDeshbord from "./AdminDeshbord";
import SignUp from "../Auth/SignUp";
import OrderReport from "./order/OrderReport";
import Sidebar from "./header_sidebar/Drawer";

const AdminRoutes = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/deshbord" element={<AdminDeshbord />} />
        <Route path="/orderreport" element={<OrderReport />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
