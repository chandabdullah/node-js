// src/routes/auth.routes.js
import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

// =======================
// 🔹 AUTH ROUTES
// =======================

// Register
router.post(
    "/register",
    validate(['name', 'email', 'password']),
    AuthController.register,
);

// Login
router.post(
    "/login",
    validate(['email', 'password'], 'body', { password: { skipLengthCheck: true } }),
    AuthController.login,
);

// Logout
router.post(
    "/logout",
    AuthController.logout,
);

export default router;
