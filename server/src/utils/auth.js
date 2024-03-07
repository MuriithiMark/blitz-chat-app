import { JWT } from "node-jsonwebtoken";
import * as bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY ?? "test-secret-key";
const jwt = new JWT(SECRET_KEY);

const verifyToken = async (token) => {
    try {
        const data = await jwt.verify(token);
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

const generateToken = async (data) => {
    try {
        const token = await jwt.sign(data, { expiresIn: 60 * 60 }) // Expires in 1hr
        return token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export {
    verifyToken,
    generateToken,
    hashPassword,
    comparePassword
}