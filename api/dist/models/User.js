"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true });
;
exports.default = (0, mongoose_1.model)('User', userSchema);
