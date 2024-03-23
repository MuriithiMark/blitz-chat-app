const DateSortedMessageArray = <T>(data: (T & { createdAt: Date })[]): T[] => {
    return data.sort((a, b) => {
        return (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime())
    })
};


export { DateSortedMessageArray };
