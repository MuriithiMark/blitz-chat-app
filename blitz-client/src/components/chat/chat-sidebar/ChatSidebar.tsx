import ChatSidebarBottom from "../chat-container/ChatSidebarBottom";
import ChatSidebarTop from "../chat-container/ChatSidebarTop";

const ChatSidebar = () => {
  return (
    <div className="side-bar">
      <ChatSidebarTop />
      <ChatSidebarBottom />
    </div>
  );
};

export default ChatSidebar;
