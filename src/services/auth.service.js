import Session from "../models/session.model.js";
import { JwtUtils } from "../utils/jwt.util.js";

class AuthService {

    /**
     * Get User payload
     * @param {Object} user
     */
    static getUserPayload(user) {
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user?.username,
            role: user.role,
        };
        return payload;
    }

    /**
     * Generate Access + Refresh Token Pair + Create Session
     * @param {Object} user - Mongoose user document
     * @param {Request} req - Express request object
     */
    static async generateAuthTokens(user, req) {
        const payload = this.getUserPayload(user);

        const { accessToken, refreshToken } = JwtUtils.generateTokenPair(payload);

        // Save device session (multiple allowed)
        await Session.create({
            userId: user._id,
            refreshToken,
            ip: req?.ip,
            userAgent: req?.headers["user-agent"],
        });

        return { accessToken, refreshToken };
    }

    /**
     * Refresh Token
     * @param {string} refreshToken 
     * @returns {Object} new access token
     */
    static async refreshToken(refreshToken) {
        if (!refreshToken) throw new Error("Refresh token is required");

        // Check if session exists and active
        const session = await Session.findOne({ refreshToken, isActive: true });
        if (!session) throw new Error("Invalid or expired session");

        // Validate refresh token itself
        const decoded = JwtUtils.safeVerify(refreshToken);
        if (!decoded) throw new Error("Invalid or expired refresh token");

        // Issue new access token
        const newAccessToken = JwtUtils.refreshAccessToken(refreshToken);
        return { accessToken: newAccessToken };
    }

    /**
     * Logout from current device/session
     * @param {string} refreshToken 
     */
    static async logout(refreshToken) {
        if (!refreshToken) {
            return { message: "Already logged out" };
        }

        await Session.updateOne(
            { refreshToken },
            { $set: { isActive: false } }
        );

        return { message: "Logged out successfully" };
    }

    /**
     * Logout from all devices
     * @param {ObjectId} userId 
     */
    static async logoutAll(userId) {
        await Session.updateMany(
            { userId },
            { $set: { isActive: false } }
        );

        return { message: "Logged out from all devices" };
    }
}

export default AuthService;
