// src/models/user.model.js
import mongoose from "mongoose";
import { PasswordUtils } from "../utils/password.util.js";
import AuthService from "../services/auth.service.js";
import { StringUtils } from "../utils/string.util.js";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, unique: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await PasswordUtils.hash(this.password);

    if (this.isNew && !this.isModified("username")) {
        this.username = StringUtils.generateUsername(this.name);
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    return PasswordUtils.compare(password, this.password);
};

/**
 * Generate Access + Refresh Token Pair
 */
userSchema.methods.generateAuthToken = function () {
    return AuthService.generateAuthTokens(this);
}

export default mongoose.model("User", userSchema);
