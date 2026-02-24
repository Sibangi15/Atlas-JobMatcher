import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.header("auth-token");

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

const fetchuser = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            error: 'Please authenticate using a valid token'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({
            error: 'Please authenticate using a valid token'
        });
    }
};

export default fetchuser;