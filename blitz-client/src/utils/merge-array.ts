import { Message } from "../features/app/app.slice";

type CommonGroupAndFriendProps = {
    id: string;
    createdAt: Date;
    messages: Message[];
}

const MergedArrayDateSorted = <T, K>(a: (T & CommonGroupAndFriendProps)[], b: (K & CommonGroupAndFriendProps)[]): (T | K)[] => {
    const initialArray = [...a, ...b];
    // sort by last message
    return initialArray.sort((a, b) => {
        if (!a.messages.length && !b.messages.length) {
            return (
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }
        const a__lastMessage = a.messages[a.messages.length - 1];
        const b__lastMessage = b.messages[b.messages.length - 1];
      
        if (!a__lastMessage) {
            return (
                new Date(b__lastMessage.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }

        if (!b__lastMessage) {
            return (
                new Date(b.createdAt).getTime() - new Date(a__lastMessage.createdAt).getTime()
            )
        }
        return (
            new Date(b__lastMessage.createdAt).getTime() - new Date(a__lastMessage.createdAt).getTime()
        )
    })
}

export { MergedArrayDateSorted }