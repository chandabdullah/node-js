import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// -----------------------------------------------------------------------------
// 🌍 Dynamic environment file loading
// -----------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV = process.env.NODE_ENV || "dev";
const envFile = `.env.${ENV}`;

dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

// -----------------------------------------------------------------------------
// ⚙️ Config object
// -----------------------------------------------------------------------------
const config = {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    jwtSecret: process.env.JWT_SECRET || "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/nextlevel",
    nodeEnv: process.env.NODE_ENV || "development",

    // Email configuration
    email: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === "true",
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        fromName: process.env.EMAIL_FROM_NAME || "My App",
        fromEmail: process.env.EMAIL_FROM_EMAIL || process.env.EMAIL_USER,
    },

    // OneSignal configuration
    oneSignal: {
        appId: process.env.ONESIGNAL_APP_ID,
        apiKey: process.env.ONESIGNAL_API_KEY,
    },
};

export default config;
