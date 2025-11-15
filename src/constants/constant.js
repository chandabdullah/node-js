// src/config/constants.js

const constants = {
    // -----------------------------
    // Project
    // -----------------------------
    PROJECT_NAME: "MyNodeApp",
    PROJECT_DESCRIPTION: "A Node.js boilerplate with full utilities and services",
    PROJECT_VERSION: "1.0.0",
    BASE_URL: process.env.BASE_URL || "http://localhost:5000",

    // -----------------------------
    // Uploads
    // -----------------------------
    UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
    UPLOAD_URL: process.env.UPLOAD_URL || "/uploads",
    MAX_FILE_SIZE_MB: Number(process.env.MAX_FILE_SIZE_MB) || 10, // 10 MB default

    // -----------------------------
    // JWT
    // -----------------------------
    JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "1h",
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",

    // -----------------------------
    // Email
    // -----------------------------
    EMAIL: {
        HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
        PORT: Number(process.env.EMAIL_PORT) || 587,
        SECURE: process.env.EMAIL_SECURE === "true" || false,
        USER: process.env.EMAIL_USER || "",
        PASS: process.env.EMAIL_PASS || "",
        FROM_NAME: process.env.EMAIL_FROM_NAME || "MyNodeApp",
        FROM_EMAIL: process.env.EMAIL_FROM_EMAIL || "no-reply@mynodeapp.com",
    },

    // -----------------------------
    // OTP
    // -----------------------------
    OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
    OTP_EXPIRY_MINUTES: Number(process.env.OTP_EXPIRY_MINUTES) || 5,

    // -----------------------------
    // General
    // -----------------------------
    SUPPORTED_LANGUAGES: ["en", "es", "fr", "de"],

    // -----------------------------
    // Pagination
    // -----------------------------
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
};

export default constants;
