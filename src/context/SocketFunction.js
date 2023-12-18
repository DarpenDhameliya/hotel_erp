import { useEffect, useState } from "react";
import io from "socket.io-client";

function SocketFunction() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket = io("http://192.168.0.237:8000");

    // You can listen to socket events here
    newSocket.on("connect", () => setSocket(newSocket));

    return () => newSocket.disconnect();
  }, []);

  return socket; // This component doesn't need to render anything
}

export default SocketFunction;
