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
        const a__lastMessage = a.messages[a.messages.length - 1];
        const b__lastMessage = b.messages[b.messages.length - 1];
        if (!a__lastMessage && !b__lastMessage) {
            return (
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
        }
        if (!a__lastMessage) {
            return (
                new Date(a.createdAt).getTime() - new Date(b__lastMessage.createdAt).getTime()
            )
        }

        if (!b__lastMessage) {
            return (
                new Date(a__lastMessage.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
        }
        return (
            new Date(a__lastMessage.createdAt).getTime() - new Date(b__lastMessage.createdAt).getTime()
        )
    })
}

export { MergedArrayDateSorted }