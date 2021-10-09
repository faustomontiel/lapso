"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    MONGO_URI: process.env.DATABASE || 'lapso',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'KEY_JWT',
};
