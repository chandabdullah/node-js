import { JwtUtils } from "../utils/jwt.util.js";
import { generateErrorApiResponse } from "../utils/response.util.js";
import logger from "../config/logger.js";

/**
 * Middleware to protect API routes with optional whitelist
 * @param {string[]} whitelist - Array of paths that don't require token
 */
const authMiddleware = (whitelist = []) => (req, res, next) => {
    try {
        // Skip token check if route is whitelisted
        if (whitelist.includes(req.path)) {
            return next();
        }

        const authHeader = req.headers.authorization;
        const token = JwtUtils.extractBearerToken(authHeader);

        if (!token) {
            return generateErrorApiResponse(res, 401, "Unauthorized: No token provided");
        }

        const decoded = JwtUtils.safeVerify(token);
        if (!decoded) {
            return generateErrorApiResponse(res, 401, "Unauthorized: Invalid or expired token");
        }

        // Attach decoded payload
        req.user = decoded;

        next();
    } catch (error) {
        logger.error(`[AuthMiddleware] Error validating token: ${error.message}`);
        return generateErrorApiResponse(res, 401, "Unauthorized: Token verification failed");
    }
};

export default authMiddleware;
