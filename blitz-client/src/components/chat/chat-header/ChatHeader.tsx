import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../../features/store";
import { setContext } from "../../../features/app/app.slice";
import { toggleAddGroupMembers } from "../../../features/modals/modal.slice";
import { isGroup } from "../../../utils/type-guards";
import AvatarImg from "../../avatar-img/AvatarImg";

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

  export default ChatHeader;