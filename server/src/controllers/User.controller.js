import express from "express"
/**
 * @typedef {(
 *      req: express.Request,
 *      res: express.Response,
 *      next: express.NextFunction
 *   ) => Promise<void>
 * } ExpressFunction
 */

/**
 * @type {ExpressFunction}
 */
const getAllUsers = async (req, res, next) => {
    
}


const UserController = {
    getAllUsers
}

export default UserController