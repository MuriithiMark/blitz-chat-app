import { useState, useContext } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../features/store";
import AuthContext from "../../../contexts/auth/AuthContext";
import useSocket from "../../../hooks/useSocket";
import FileInput from "../../file-input/FileInput";

type FileSelectParams = {
  filePath: string;
  fileType: string;
};

const ChatFooter = () => {
  const [text, setText] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileReset, setFileReset] = useState(false);

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
    if (!user || (!filePath && !text)) return;

    // only reset the file input when sending message, not before
    setFileReset(true);

    if (app.isGroup) {
      // handle group messages
      let messageData = {
        newMessage: {
          content: text.trim(),
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
          content: text.trim(),
          hasFile: filePath.length > 0,
          filePath,
          fileType,
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
    setFilePath("");
  };

  const handleFileSelect = ({ filePath, fileType }: FileSelectParams) => {
    setFilePath(filePath);
    setFileType(fileType);
  };

  const onFileResetUnset = () => {
    setFileReset(false);
  };

  return (
    <div className="footer" onKeyDown={handleKeyDown}>
      <FileInput
        onFileSelect={handleFileSelect}
        required={false}
        fileReset={fileReset}
        onFileResetUnset={onFileResetUnset}
      />
      <input type="text" value={text} onChange={handleChange} />
      <button
        className="send-btn"
        onClick={handleSendMessage}
        disabled={!filePath && (!text || !text.trim())}
      >
        Send
      </button>
    </div>
  );
};

export default ChatFooter;
