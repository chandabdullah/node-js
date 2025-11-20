import { User } from '../startup/models.js';
import { generateApiResponse, generateErrorApiResponse } from '../utils/response.util.js';
import AuthService from '../services/auth.service.js';
import { StatusCodes } from 'http-status-codes';

class AuthController {

    static async register(req, res) {
        const { name, email, password } = req.body;

        // const existing = await User.findOne({ email });
        // if (existing) {
        //     return generateApiResponse(res, StatusCodes.CONFLICT, "Email already in use!");
        // }

        const user = await User.create({ name, email, password });

        generateApiResponse(res, 201, "Registration successful", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }

    static async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return generateErrorApiResponse(res, StatusCodes.CONFLICT, "User does not exist with this email");
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return generateErrorApiResponse(res, StatusCodes.CONFLICT, "Incorrect password!");
        }

        const tokens = await user.generateAuthToken(req);

        // generateApiResponse(res, 200, "Login successful", {
        //                 accessToken: tokens.accessToken,
        //                 refreshToken: tokens.refreshToken,
        //                 user: {
        //                     id: user._id,
        //                     name: user.name,
        //                     email: user.email,
        //                     role: user.role
        //                 }
        //             });
        generateApiResponse(
            res, StatusCodes.OK, "Login Successful",
            {
                ...tokens,
                user: AuthService.getUserPayload(user),
            }
        )
    }

    static async logout(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return generateErrorApiResponse(res, "Refresh token is required", { statusCode: 400 });
            }

            const result = await AuthService.logout(refreshToken);

            generateApiResponse(res, 200, "Logged out successfully", result);
        } catch (error) {
            generateErrorApiResponse(res, error);
        }
    }
}

export default AuthController;
