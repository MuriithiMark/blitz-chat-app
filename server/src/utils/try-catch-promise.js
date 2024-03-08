const tryCatchPromise = async (cb) => {
    try {
        const result = await cb;
        return [result, null];
    } catch (error) {
        return [null, error];
    }
}

export default tryCatchPromise;