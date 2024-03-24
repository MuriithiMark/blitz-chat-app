import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./add-group-members.scss";
import { RootState } from "../../../features/store";
import AvatarImg from "../../avatar-img/AvatarImg";
import { useState } from "react";
import SquareCheckFill from "../../icons/SquareCheckFill";
import Square from "../../icons/Square";
import { updateGroup } from "../../../features/groups/groups.slice";
import { addGroupMembers } from "../../../services/api/groups";
import { closeAllModals } from "../../../features/modals/modal.slice";

const AddGroupMembers = () => {
  const friends = useSelector((state: RootState) => state.friends);
  const groupId = useSelector((state: RootState) => state.app.contextId);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleFriendSelect = (friendId: string) => {
    if (selectedIds.includes(friendId)) {
      setSelectedIds(selectedIds.filter((id) => id !== friendId));
    } else {
      setSelectedIds([...selectedIds, friendId]);
    }
  };

  const handleAddGroupMembers = async () => {
    try {
      const group = await addGroupMembers(groupId!, { members: selectedIds });
      dispatch(updateGroup(group));
      setSelectedIds([]);
      dispatch(closeAllModals());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-group-members">
      <div className="select-friends-container">
        {friends.map((friend) => (
          <div className="select-friend-card" key={friend.id}>
            <div className="avatar-wrapper">
              <AvatarImg
                src={friend.avatarUrl}
                username={friend.username}
                extraQueryParams="background=random"
                width="60px"
                height="60px"
              />
            </div>
            <span className="username">@{friend.username}</span>
            <div
              className="check-div"
              onClick={() => handleFriendSelect(friend.id)}
            >
              {selectedIds.includes(friend.id) ? (
                <SquareCheckFill width={40} height={40} color="skyblue" />
              ) : (
                <Square width={40} height={40} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bottom">
        <button className="add-friend-btn" onClick={handleAddGroupMembers}>
          Add friends To Group
        </button>
      </div>
    </div>
  );
};

export default AddGroupMembers;
