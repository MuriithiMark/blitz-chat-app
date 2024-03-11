/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const headerModifier = async (req, res, next) => {
    // TODO modify to allow only my domains
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next()
}

export default headerModifier;