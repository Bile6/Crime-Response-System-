import jwt from "jsonwebtoken";

export const authenticate  = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token)  return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({message: "Invalid token"});
        req.user = user;
        next();
    });
}

export function authorize(type) {
    return (req, res, next) => {
        if (req.user.type !== type) {
            return res.status(403).json({message: "Access denied"});
        }
        next();
    }
}

