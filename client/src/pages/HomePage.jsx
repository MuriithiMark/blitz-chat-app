import React, { useEffect } from "react";
import socket from "../services/socket";

function HomePage() {
  useEffect(() => {
    setTimeout(() => {
        socket.emit("hello", "world");
        console.log('Emitted hello')
    }, 1000)
  }, [])
  return <div></div>;
}

export default HomePage;
