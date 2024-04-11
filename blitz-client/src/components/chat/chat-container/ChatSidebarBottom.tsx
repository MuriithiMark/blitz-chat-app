import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../features/store";
import { setContext } from "../../../features/app/app.slice";
import { Friend } from "../../../features/friends/friends.slice";
import { Group } from "../../../features/groups/groups.slice";
import { MergedArrayDateSorted } from "../../../utils/merge-array";
import { isGroup } from "../../../utils/type-guards";
import AvatarImg from "../../avatar-img/AvatarImg";

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

export default ChatSidebarBottom;
