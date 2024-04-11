import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./chat-container.scss";
import { RootState } from "../../../features/store";
import { getUserFriends } from "../../../services/api/friends";
import {
  addFriends,
} from "../../../features/friends/friends.slice";
import AuthContext from "../../../contexts/auth/AuthContext";
import {
  addGroups,
} from "../../../features/groups/groups.slice";
import { getUserGroups } from "../../../services/api/groups";
import ChatFooter from "../chat-footer/ChatFooter";
import ChatHeader from "../chat-header/ChatHeader";
import ChatContent from "../chat-content/ChatContent";
import ChatSidebar from "../chat-sidebar/ChatSidebar";

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
      <ChatSidebar />
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

export default ChatContainer;
