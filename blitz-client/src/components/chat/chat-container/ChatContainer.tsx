import { useDispatch, useSelector } from "react-redux";
import "./chat-container.scss";
import { RootState } from "../../../features/store";
import { useContext, useEffect, useState } from "react";
import { getUserFriends } from "../../../services/api/friends";
import {
  Friend,
  FriendshipMessage,
  addFriends,
} from "../../../features/friends/friends.slice";
import AvatarImg from "../../avatar-img/AvatarImg";
import { setContext } from "../../../features/app/app.slice";
import AuthContext from "../../../contexts/auth/AuthContext";
import useSocket from "../../../hooks/useSocket";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.friends);
  const contextData = useSelector((state: RootState) => state.app.data);

  useEffect(() => {
    // fetch friends
    getUserFriends()
      .then((friends) => dispatch(addFriends(friends)))
      .catch(console.error);
  }, []);

  console.log({ contextData });

  return (
    <div className="chat-container">
      <div className="side-bar">
        <div className="top"></div>
        <div className="bottom">
          {friends.length === 0 && <span>No Friends</span>}
          {friends.map((friend) => (
            <FriendPreviewCard friend={friend} key={friend.id} />
          ))}
        </div>
      </div>
      {contextData && (
        <div className="main">
          <div className="header">
            <AvatarImg
              src={contextData.avatarUrl}
              username={contextData.username}
            />
          </div>
          <div className="content">
            {contextData.messages.map((message) => (
              <MessageCard key={message.id} message={message} isGroup={false} />
            ))}
          </div>
          <ChatFooter />
        </div>
      )}
    </div>
  );
};

const ChatFooter = () => {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const socket = useSocket();
  const app = useSelector((state: RootState) => state.app);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!user) return;

    if (app.isGroup) {
      // handle group messages
      let messageData = {
        newMessage: {
          content: text,
          fromId: user.id,
          group: {
            connect: {
              id: app.contextId,
            },
          },
        },
      };
      console.log("Group Message ", messageData);
    } else {
      let messageData = {
        newMessage: {
          content: text,
          senderId: user.id,
          recipientId: app.data!.id,
          friendShip: {
            connect: {
              id: app.contextId,
            },
          },
        },
        from: user?.id,
        to: app.data!.id,
      };
      socket.emit(`/friends/messages/new`, messageData);
    }
    setText("");
  };

  return (
    <div className="footer" onKeyDown={handleKeyDown}>
      <input type="text" value={text} onChange={handleChange} />
      <button className="send-btn" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

const MessageCard = ({
  message,
  isGroup = false,
}: {
  message: FriendshipMessage;
  isGroup: boolean;
}) => {
  const { user } = useContext(AuthContext);
  if (isGroup) {
    return <div>Group Message {message.content}</div>;
  }

  return (
    <div className="message-card">
      <div
        className={
          user?.id === message.senderId ? "right wrapper" : "left wrapper"
        }
      >
        <div className="content">
          <span>{message.content}</span>
        </div>
        <span className="date">
          {new Date(message.createdAt).toLocaleDateString("en", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

const FriendPreviewCard = ({ friend }: { friend: Friend }) => {
  const dispatch = useDispatch();
  const onPreviewCardClick = async () => {
    dispatch(
      setContext({
        data: friend,
        isGroup: false,
        contextId: friend.friendShipId,
      })
    );
  };

  return (
    <div
      className="preview-card friend-preview-card"
      onClick={onPreviewCardClick}
    >
      <AvatarImg
        src={friend.avatarUrl}
        username={friend.username}
        name={friend.name}
      />
      <div className="info">
        <span>{friend.username}</span>
      </div>
    </div>
  );
};

export default ChatContainer;
