// src/services/authService.js
import jwt from "jsonwebtoken";
import config from "../config/index.js";

/**
 * Middleware to protect API routes
 * @param {string[]} whitelist - array of paths that don't require token
 */
export const protect = (whitelist = []) => {
    return (req, res, next) => {
        // Skip token check if route is in whitelist
        if (whitelist.includes(req.path)) return next();

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    };
};
