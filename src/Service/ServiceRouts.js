import React from "react";
import { Route, Routes } from "react-router-dom";
import ServiceDeshbord from "./ServiceDeshbord";
import SidebarService from "./header_sidebar/Drawer";

const ServiceRouts = () => {
  return (
    <>
      <SidebarService />
      <Routes>
        <Route path="/deshbord" element={<ServiceDeshbord />} />
      </Routes>
    </>
  );
};

export default ServiceRouts;
