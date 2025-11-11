import express from "express";
import { protect } from "../services/auth.service.js";

// Optional routers (uncomment only if needed)
// import adminRouter from "./admin/router.js";
// import mobileRouter from "./mobile/router.js";

const router = express.Router();

// -----------------------------------------------------------------------------
// 🟢 Whitelisted public routes
// -----------------------------------------------------------------------------
const adminWhitelist = ["/login", "/signup"];
const mobileWhitelist = ["/login", "/signup"];

// -----------------------------------------------------------------------------
// ⚙️ Admin APIs (only mount if router exists)
// -----------------------------------------------------------------------------
if (typeof adminRouter !== "undefined") {
    router.use("/ap", protect(adminWhitelist), adminRouter);
}

// -----------------------------------------------------------------------------
// ⚙️ Mobile APIs (only mount if router exists)
// -----------------------------------------------------------------------------
if (typeof mobileRouter !== "undefined") {
    router.use("/ma", protect(mobileWhitelist), mobileRouter);
}

export default router;
