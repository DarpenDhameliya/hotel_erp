import React, { createContext, useContext } from "react";
import SocketFunction from "./SocketFunction";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = SocketFunction();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export default SocketProvider;