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
        if(auth_header && auth_header.startsWith('Bearer')) {
           const authHeaderData = auth_header.split(' ');
           if(authHeaderData.length > 1) {
            auth_token = authHeaderData[1];
           }
        }

        // retrieve auth token from cookies
        if(req.cookies.auth_token && !auth_token) {
            auth_token = req.cookies.auth_token;
        }

        if (!auth_token) {
            return res.status(401).send({ status: "fail", message: "no auth_token" }).end()
        }

        const data = await verifyToken(auth_token);
            
        // set session if not set
        if(!req.session.user) {
            // Fetch the user
            const correctUser = await UserModel.getUserById(data.id);
            if(!correctUser || correctUser.isDeleted) {
                return res.status(401).send({status: 'fail', message: 'no such user'}).end()
            }
            req.session.user = correctUser;
        }
        
        next()
    } catch (error) {
        console.error(error)
        res.status(401).send({ status: "fail", message: "unauthorized" }).end()
    }
}

export default protectedRoute;