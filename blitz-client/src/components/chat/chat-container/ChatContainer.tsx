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
import {
  Group,
  GroupMessage,
  addGroups,
} from "../../../features/groups/groups.slice";
import { getUserGroups } from "../../../services/api/groups";
import { MergedArrayDateSorted } from "../../../utils/merge-array";
import { isGroup } from "../../../utils/type-guards";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);

  useEffect(() => {
    // fetch friends
    getUserFriends()
      .then((friends) => dispatch(addFriends(friends)))
      .catch(console.error);

    // fetch groups
    getUserGroups()
      .then((groups) => dispatch(addGroups(groups)))
      .catch(console.error);
  }, []);

  return (
    <div className="chat-container">
      <div className="side-bar">
        <div className="top"></div>
        <ChatSidebarBottom />
      </div>
      {app.data && (
        <div className="main">
          <div className="header">
            <AvatarImg
              src={app.data.avatarUrl}
              username={isGroup(app.data) ? app.data.name : app.data.username}
            />
          </div>
          <ChatContent />
          <ChatFooter />
        </div>
      )}
    </div>
  );
};

const ChatSidebarBottom = () => {
  const friends = useSelector((state: RootState) => state.friends);
  const groups = useSelector((state: RootState) => state.groups);
  const [mergedData, setMergedData] = useState<(Friend | Group)[]>();

  useEffect(() => {
    setMergedData(MergedArrayDateSorted(friends, groups));
  }, [friends, groups]);

  if (!mergedData) {
    return (
      <div className="bottom loading">
        <span>Loading</span>
      </div>
    );
  }

  if (!mergedData.length) {
    return (
      <div className="bottom no-friends">
        <span>No Friends</span>
      </div>
    );
  }

  return (
    <div className="bottom">
      {mergedData.map((entity) => {
        if (isGroup(entity)) {
          return <GroupPreviewCard group={entity} key={entity.id} />;
        }
        return <FriendPreviewCard friend={entity} key={entity.id} />;
      })}
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

const GroupPreviewCard = ({ group }: { group: Group }) => {
  const dispatch = useDispatch();
  const onPreviewCardClick = async () => {
    dispatch(
      setContext({
        data: group,
        isGroup: true,
        contextId: group.id,
      })
    );
  };

  return (
    <div
      className="preview-card group-preview-card"
      onClick={onPreviewCardClick}
    >
      <AvatarImg
        src={group.avatarUrl}
        username={group.name}
        name={group.name}
      />
      <div className="info">
        <span>{group.name}</span>
      </div>
    </div>
  );
};

export default ChatContainer;
