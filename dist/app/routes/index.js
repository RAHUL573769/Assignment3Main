"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../constants/routes"));
const course_controller_1 = __importDefault(require("../modules/course/course.controller"));
const globalRouter = (0, express_1.Router)();
routes_1.default.forEach((route) => {
    globalRouter.use(route.path, route.router);
});
globalRouter.get('/courses', course_controller_1.default.retrieveAllCourse);
exports.default = globalRouter;
