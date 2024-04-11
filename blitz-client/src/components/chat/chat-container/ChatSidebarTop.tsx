import { useDispatch } from "react-redux";
import { toggleCreateGroup } from "../../../features/modals/modal.slice";
import PenFill from "../../icons/PenFill";
import PeopleFill from "../../icons/PeopleFill";

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

export default ChatSidebarTop;
