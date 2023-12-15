"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("./category.controller"));
const category_validation_1 = __importDefault(require("./category.validation"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', category_controller_1.default.retrieveAllCategory);
categoryRouter.post('/', (0, validationRequest_1.default)(category_validation_1.default), category_controller_1.default.createCategory);
exports.default = categoryRouter;
