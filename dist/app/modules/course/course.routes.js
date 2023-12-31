"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("./course.controller"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const course_validation_1 = __importDefault(require("./course.validation"));
const courseRouter = (0, express_1.Router)();
courseRouter.post("/", (0, validationRequest_1.default)(course_validation_1.default), course_controller_1.default.createCourse);
courseRouter.get("/best", course_controller_1.default.getBestCourse);
exports.default = courseRouter;
