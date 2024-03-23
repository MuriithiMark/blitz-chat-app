import { useDispatch, useSelector } from "react-redux";
import "./chat-container.scss";
import { RootState } from "../../../features/store";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserFriends } from "../../../services/api/friends";
import {
  Friend,
  FriendshipMessage,
  addFriends,
} from "../../../features/friends/friends.slice";
import AvatarImg from "../../avatar-img/AvatarImg";
import { Message, setContext } from "../../../features/app/app.slice";
import AuthContext from "../../../contexts/auth/AuthContext";
import useSocket from "../../../hooks/useSocket";
import { Group, GroupMessage } from "../../../features/groups/groups.slice";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.friends);
  const app = useSelector((state: RootState) => state.app);

  useEffect(() => {
    // fetch friends
    getUserFriends()
      .then((friends) => dispatch(addFriends(friends)))
      .catch(console.error);
  }, []);

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
      {app.data && (
        <div className="main">
          <div className="header">
            <AvatarImg
              src={(app.data as Friend).avatarUrl}
              username={(app.data as Friend).username}
            />
          </div>
          <ChatContent />
          <ChatFooter />
        </div>
      )}
    </div>
  );
};

const ChatContent = () => {
  const app = useSelector((state: RootState) => state.app);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [app.data?.messages]);

  return (
    app.data && (
      <div className="content">
        {!app.isGroup
          ? (app.data as Friend).messages.map((message) => (
              <FriendMessageCard key={message.id} message={message} />
            ))
          : (app.data as unknown as Group).messages.map((message) => (
              <GroupMessageCard key={message.id} message={message} />
            ))}
        <div ref={scrollRef} />
      </div>
    )
  );
};

const ChatFooter = () => {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const app = useSelector((state: RootState) => state.app);
  const socket = useSocket();

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

const FriendMessageCard = ({ message }: { message: FriendshipMessage }) => {
  const { user } = useContext(AuthContext);

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
    console.log({
      friend: friend.username,
      len: friend.messages.length,
      messages: friend.messages,
    });
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

const GroupMessageCard = ({ message }: { message: GroupMessage }) => {
  return <div>{message.content}</div>;
};
export default ChatContainer;
