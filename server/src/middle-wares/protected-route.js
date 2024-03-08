import { verifyToken } from "../utils/auth.js";

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const protectedRoute = async (req, res, next) => {
    try {
        const auth_token = req.cookies.auth_token;
        if (!auth_token) {
            return res.status(401).send({ status: "fail", message: "no auth_token" }).end()
        }
        await verifyToken(auth_token);
        // check that user is valid
        next()
    } catch (error) {
        res.status(401).send({ status: "fail", message: "unauthorized" }).end()
    }
}

export default protectedRoute;