"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = (res, data) => {
    res.json({
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    });
};
exports.successResponse = successResponse;
