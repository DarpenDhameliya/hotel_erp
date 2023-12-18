import React, { lazy, Suspense } from "react";
import "./Asset/main.css";
import { Route, Routes } from "react-router-dom/";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { theme } from "./Auth/Theme";
// import SocketProvider from './context/SocketContext';
const SocketProvider = lazy(() => import("./context/SocketContext"));

const Login = lazy(() => import("./Auth/Login"));
const AdminRoutes = lazy(() => import("./Admin/AdminRoutes"));
const KitechanRouts = lazy(() => import("./kitchen/KitechanRouts"));
const ServiceRouts = lazy(() => import("./Service/ServiceRouts"));

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <SocketProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route path="/sign" element={<SignUp />} /> */}
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/kitchen/*" element={<KitechanRouts />} />
              <Route path="/service/*" element={<ServiceRouts />} />
            </Routes>
          </SocketProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
