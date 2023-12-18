import React, { useEffect } from "react";
import KitechanDeshbord from "./KitechanDeshbord";
import { Route, Routes, useNavigate } from "react-router-dom";

const KitechanRouts = () => {
  const nevigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      nevigate('/')
    }
  }, [])
  
  return (
    <>
      <Routes>
        <Route path="/deshbord" element={<KitechanDeshbord />} />
      </Routes>
    </>
  );
};

export default KitechanRouts;
