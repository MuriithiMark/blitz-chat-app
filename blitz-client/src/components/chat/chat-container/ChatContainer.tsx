import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./chat-container.scss";
import { RootState } from "../../../features/store";
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
import PeopleFill from "../../icons/PeopleFill";
import PenFill from "../../icons/PenFill";
import {
  toggleAddGroupMembers,
  toggleCreateGroup,
} from "../../../features/modals/modal.slice";
import { SERVER_URL } from "../../../utils/constants";
import FileInput from "../../file-input/FileInput";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const app = useSelector((state: RootState) => state.app);

  useEffect(() => {
    const loadData = async () => {
      // fetch friends
      getUserFriends()
        .then((friends) => dispatch(addFriends(friends)))
        .catch((error) => {
          console.error(error);
          dispatch(addFriends([]));
        });

      // fetch groups
      getUserGroups()
        .then((groups) => dispatch(addGroups(groups)))
        .catch((error) => {
          console.error(error);
          dispatch(addGroups([]));
        });
    };

    loadData();
  }, [user]);

  return (
    <div className="chat-container">
      <div className="side-bar">
        <ChatSidebarTop />
        <ChatSidebarBottom />
      </div>
      {app.data && (
        <div className="main">
          <ChatHeader />
          <ChatContent />
          <ChatFooter />
        </div>
      )}
    </div>
  );
};

const ChatHeader = () => {
  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuToggle = () => setMenuIsOpen(!menuIsOpen);
  const handleCloseChat = async () =>
    dispatch(
      setContext({
        contextId: undefined,
        isGroup: false,
        data: undefined,
      })
    );
  const handleAddGroupMembers = async () => dispatch(toggleAddGroupMembers());
  const handleLeaveGroup = async () => {
    console.log("Handle Leave Group");
  };
  const handleBlockFriend = async () => {
    console.log("Handle Block Friend");
  };

  const GroupMenu = () => {
    return (
      <>
        <button onClick={handleAddGroupMembers}>
          <span>Add Members</span>
        </button>
        <button onClick={handleCloseChat}>
          <span>Close Chat</span>
        </button>
        <button onClick={handleLeaveGroup}>
          <span>Leave Group</span>
        </button>
      </>
    );
  };

  const FriendMenu = () => {
    return (
      <>
        <button onClick={handleCloseChat}>
          <span>Close Chat</span>
        </button>
        <button onClick={handleBlockFriend}>
          <span>Block Friend</span>
        </button>
      </>
    );
  };

  if (!app.data) {
    return <></>;
  }

  return (
    <div className="header">
      <AvatarImg
        src={app.data.avatarUrl}
        username={isGroup(app.data) ? app.data.name : app.data.username}
      />
      <div className="bio">
        <div className="username">
          {isGroup(app.data) ? app.data.name : "@" + app.data.username}
        </div>
        <div className="status">{isGroup(app.data) ? "Group" : "Online"}</div>
      </div>
      <div className="actions">
        <div
          className="menu"
          id="chat-header-context-menu"
          style={{ display: menuIsOpen ? "flex" : "none" }}
        >
          {isGroup(app.data) ? <GroupMenu /> : <FriendMenu />}
        </div>
        <button onClick={handleMenuToggle}>Menu</button>
      </div>
    </div>
  );
};

const ChatSidebarTop = () => {
  const dispatch = useDispatch();
  const handleCreateAGroup = () => {
    try {
      dispatch(toggleCreateGroup());
    } catch (error) {
      console.error(error);
    }
  };
  const handleWriteAPost = () => {};
  return (
    <div className="top">
      <button onClick={handleCreateAGroup}>
        <PeopleFill width={20} height={20} />
        <span className="tooltip">Create a group</span>
      </button>
      <button onClick={handleWriteAPost}>
        <PenFill width={20} height={20} />
        <span className="tooltip">Write a Post</span>
      </button>
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
  const [filePath, setFilePath] = useState("");
  const [fileType, setFileType] = useState("");
  const fileRef = useRef<HTMLInputElement>();
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
          hasFile: filePath.length > 0,
          filePath,
          fileType,
          group: {
            connect: {
              id: app.contextId,
            },
          },
          from: {
            connect: {
              id: user.id,
            },
          },
        },
      };
      socket.emit("/groups/messages/new", messageData);
    } else {
      let messageData = {
        newMessage: {
          content: text,
          hasFile: filePath.length > 0,
          filePath,
          fileType,
          // from: {
          //   connect: {
          //     id: user.id,
          //   },
          // },
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
    if(fileRef && fileRef.current) {
      fileRef.current.value = ""
    }
    setText("");
  };

  const handleFileSelect = ({
    filePath,
    fileType,
  }: {
    filePath: string;
    fileType: string;
  }) => {
    setFilePath(filePath);
    setFileType(fileType);
  };

  return (
    <div className="footer" onKeyDown={handleKeyDown}>
      <FileInput
        onFileSelect={handleFileSelect}
        required={false}
        // @ts-ignore
        fileInputRef={fileRef}
      />
      <input type="text" value={text} onChange={handleChange} />
      <button
        className="send-btn"
        onClick={handleSendMessage}
        disabled={!filePath || !text}
      >
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
          <span>{message.content}</span>
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

const FileMessage = ({ message }: { message: Message }) => {
  return (
    <div className="file-message">
      {(message.fileType === "image" ||
        message.fileType === "jpeg" ||
        message.fileType === "png" ||
        message.fileType === "gif") && (
        <div className="file-message">
          <img
            src={SERVER_URL + "/" + message.filePath}
            alt={message.filePath}
          />
        </div>
      )}
      {(message.fileType === "video" || message.fileType === "mkv") && (
        <div className="file-message">
          <video src={SERVER_URL + "/" + message.filePath} controls></video>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
