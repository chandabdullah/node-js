import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
// Optional routers
// import adminRouter from "./admin/router.js";
// import mobileRouter from "./mobile/router.js";
import { WHITELIST } from "../config/whitelist.js";

const router = express.Router();

// -----------------------------------------------------------------------------
// ⚙️ Admin APIs
// -----------------------------------------------------------------------------
if (typeof adminRouter !== "undefined") {
    router.use(
        "/ap",
        authMiddleware(WHITELIST.admin), // use whitelist from config
        adminRouter
    );
}

// -----------------------------------------------------------------------------
// ⚙️ Mobile APIs
// -----------------------------------------------------------------------------
if (typeof mobileRouter !== "undefined") {
    router.use(
        "/ma",
        authMiddleware(WHITELIST.mobile), // use whitelist from config
        mobileRouter
    );
}

export default router;
