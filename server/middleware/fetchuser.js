import jwt from 'jsonwebtoken';

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