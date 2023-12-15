"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const errorResponseObj = {
        success: false,
        message: 'Internal Server Error',
        errorMessage: 'Something Wrong Happened',
        errorDetails: error || `Can't find the errorDetails`,
        stack: error.stack || `Can't find the error stack`,
    };
    if (error.name == 'ZodError') {
        errorResponseObj.message = 'Validation Error';
        let errorMessage = '';
        error.issues.map((errorObj) => {
            errorMessage += `${errorObj.path} is ${errorObj.message.toLowerCase()}. `;
        });
        errorResponseObj.errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }
    if (error.name == 'CastError') {
        errorResponseObj.message = 'Invalid ID';
        errorResponseObj.errorMessage = `${(_a = error === null || error === void 0 ? void 0 : error.value) === null || _a === void 0 ? void 0 : _a._id} is not a valid ID`;
        errorResponseObj.errorDetails = {
            stringValue: (_b = error === null || error === void 0 ? void 0 : error.value) === null || _b === void 0 ? void 0 : _b._id,
            valueType: 'string',
            king: error === null || error === void 0 ? void 0 : error.kind,
            value: (_c = error === null || error === void 0 ? void 0 : error.value) === null || _c === void 0 ? void 0 : _c._id,
            path: error === null || error === void 0 ? void 0 : error.path,
            reason: error === null || error === void 0 ? void 0 : error.reason,
            name: error === null || error === void 0 ? void 0 : error.name,
            message: `${error === null || error === void 0 ? void 0 : error.message.toString()}`,
        };
    }
    res.status(error.statusCode || 500).json(errorResponseObj);
});
exports.default = globalErrorHandler;
