import { Friend } from "../features/friends/friends.slice";
import { Group } from "../features/groups/groups.slice";

const isGroup = (entity: (Group | Friend)): entity is Group => {
    if((entity as Friend).friendShipId) {
        return false;
    }
    return true;
}

export {
    isGroup
}