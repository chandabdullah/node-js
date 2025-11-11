// src/startup/init.js
import { connectDB } from "../config/database.js";

export default async function init() {
    await connectDB();
    // future: connect Redis, initialize queues, seed data
}
