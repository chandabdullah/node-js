// src/utils/response.js
export const OK = (res, data) => res.status(200).json({ success: true, data });
export const CREATED = (res, data) => res.status(201).json({ success: true, data });
export const FAIL = (res, code = 400, message = "Bad Request") => res.status(code).json({ success: false, message });
