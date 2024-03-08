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
const registerUser = async (req, res, next) => {

}


/**
 * @type {ExpressFunction}
 */
const loginUser = async (req, res, next) => {
    
}


/**
 * @type {ExpressFunction}
 */
const logoutUser = async (req, res, next) => {
    
}


const AuthController = {
    registerUser,
    loginUser,
    logoutUser
}


export default AuthController;