// src/index.js
import app from "./app.js";
import init from "./startup/init.js";
import config from "./config/index.js";

const start = async () => {
    await init();
    const port = config.port;
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
};

start().catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
});
