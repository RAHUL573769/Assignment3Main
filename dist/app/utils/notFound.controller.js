"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const notFoundController = (req, res) => {
    res.status(statusCode_1.default.NOT_FOUND).json({
        success: false,
        message: 'Invalid route',
        errorMessage: `Could not find ${req.originalUrl} on the server`,
    });
};
exports.default = notFoundController;
