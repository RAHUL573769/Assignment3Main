"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = __importDefault(require("./review.controller"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const review_validation_1 = __importDefault(require("./review.validation"));
const reviewRouter = (0, express_1.Router)();
reviewRouter.post('/', (0, validationRequest_1.default)(review_validation_1.default), review_controller_1.default.createReview);
exports.default = reviewRouter;
