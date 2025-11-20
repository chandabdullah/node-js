// src/config/whitelist.js

export const WHITELIST = {
    overall: [
        "/health",
        "/auth/register",
        "/auth/login",
    ],

    mobile: [
        "/mobile/login",
        "/mobile/register",
        "/mobile/forgot-password",
    ],

    admin: [
        "/admin/login",
        "/admin/register",
    ],

    // Add more categories as needed
    other: [],
};
