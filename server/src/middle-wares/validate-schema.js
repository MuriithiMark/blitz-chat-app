import {validationResult, matchedData} from "express-validator";

/**
 * @type { import("../type-definitions.d").ExpressFunction }
 */
const validateSchema = async (req, res, next) => {
    console.log('req.body ', req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({status: "fail", errors}).end()
    }

    req.data = matchedData(req)
    next()
}

export default validateSchema