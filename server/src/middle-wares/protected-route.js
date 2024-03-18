import UserModel from "../models/User.model.js";
import { verifyToken } from "../utils/auth.js";


/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const protectedRoute = async (req, res, next) => {
    try {
        const auth_header = req.headers.authorization;
        let auth_token;

        // retrieve auth token from Authorization Header with Bearer
        if (auth_header && auth_header.startsWith('Bearer')) {
            auth_token = auth_header.split(' ')[1];
        }

        // retrieve auth token from cookies
        if (req.cookies.auth_token && !auth_token) {
            auth_token = req.cookies.auth_token;
        }

        if (!auth_token) {
            // return res.status(401).send({ status: "fail", message: "no auth_token" }).end()
            return res.status(401).send({status: 'fail', message: 'unauthorized'}).end()
        }

        const data = await verifyToken(auth_token);

        const foundUser = await UserModel.getUserById(data.id);
        if(!foundUser) {
            return res.status(401).send({status: 'fail', message: 'unauthorized'}).end()
        }

        if(!req.session.user) {
            console.log('Logged in but session erased!')
            req.session.user = foundUser;
            console.log('Session ', req.session, ' req.url ', req.originalUrl)
        }
        next()
    } catch (error) {
        console.error(error)
        // res.status(401).send({ status: "fail", message: "unauthorized" }).end()
        return res.status(401).send({status: 'fail', message: 'unauthorized'}).end()
    }
}

export default protectedRoute;