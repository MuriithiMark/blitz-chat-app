import React, { useEffect, useState } from "react";

import "./home-page.scss";
// import { chatSocket as socket } from "../../services/socket";
import SideBar from "../../components/shared/side-bar/SideBar";
import Header from "../../components/shared/header/Header";
import ChatContainer from "../../components/chat-container/ChatContainer";

function HomePage() {
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  // /**
  //  * @param {React.ChangeEvent<HTMLTextAreaElement>} event
  //  */
  // const handleChange = (event) => {
  //   setMessage(event.target.value);
  // };

  // const handleSendMessage = () => {
  //   const messageData = {
  //     id: 1,
  //     content: message,
  //     senderId: 1,
  //     recipientId: 2,
  //     createdAt: new Date(),
  //   };
  //   console.log("Message Data ", messageData);
  //   socket.emit("new", 1, messageData);
  // };

  // useEffect(() => {
  //   socket.on("notify-friend__new", async (friendShip, data) => {
  //     console.log(`Data: `, friendShip, data);
  //     // push data into messages
  //     if (data.status === "fail") {
  //       setErrorMessage(data.message);
  //       return;
  //     }
  //     setErrorMessage(null);
  //     setMessages((prevMessages) => {
  //       return [...prevMessages, data];
  //     });
  //   });

  //   socket.on("notify-friend__typing", async (data) => {
      
  //   })
  // }, []);

  // useEffect(() => {
  //   if (message.length > 3) {
  //     socket.emit("typing");
  //   }
  // }, [message]);

  return (
    <div className="home-page">
      <ChatContainer />
    </div>
  );
}

export default HomePage;
