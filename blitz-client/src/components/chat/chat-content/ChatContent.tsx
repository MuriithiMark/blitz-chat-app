import { useContext, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../features/store";
import AuthContext from "../../../contexts/auth/AuthContext";
import { Message } from "../../../features/app/app.slice";
import {
  FriendshipMessage,
  Friend,
} from "../../../features/friends/friends.slice";
import { GroupMessage, Group } from "../../../features/groups/groups.slice";
import { SERVER_URL } from "../../../utils/constants";
import AvatarImg from "../../avatar-img/AvatarImg";

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
          {message.hasFile && <FileMessage message={message} />}
          {message.content && <span>{message.content}</span>}
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

const GroupMessageCard = ({ message }: { message: GroupMessage }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="message-card">
      <div
        className={
          user?.id === message.from.id
            ? "right wrapper group-message-wrapper"
            : "left wrapper group-message-wrapper"
        }
      >
        <div className="content group-content">
          <div className="sender-info">
            <AvatarImg
              src={message.from.avatarUrl}
              username={message.from.username}
              extraQueryParams="background=random"
              width="40px"
              height="40px"
            />
            <span className="username">
              {message.from.id === user?.id
                ? "You"
                : `@${message.from.username}`}
            </span>
          </div>
          <div className="content">
            {message.hasFile && <FileMessage message={message} />}
            {message.content && <span>{message.content}</span>}
          </div>
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

const FileMessage = ({ message }: { message: Message }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFileLoad = async () => {
    setIsLoaded(true);
  };

  return (
    <div
      className="file-container"
      style={
        isLoaded
          ? {}
          : {
              height: "20em",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }
      }
    >
      {(message.fileType === "image" ||
        message.fileType === "jpeg" ||
        message.fileType === "png" ||
        message.fileType === "gif") && (
        <img
          src={SERVER_URL + "/" + message.filePath}
          alt={message.filePath}
          onLoad={handleFileLoad}
        />
      )}
      {(message.fileType === "video" || message.fileType === "mkv") && (
        <video
          src={SERVER_URL + "/" + message.filePath}
          controls
          onLoad={handleFileLoad}
        ></video>
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

export default ChatContent;
