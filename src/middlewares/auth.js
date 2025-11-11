// src/middleware/auth.js
import jwt from "jsonwebtoken";
import config from "../config/index.js";

export default (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ success: false, message: "Unauthorized" });
    const token = header.split(" ")[1];
    try {
        req.user = jwt.verify(token, config.jwtSecret);
        next();
    } catch {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
