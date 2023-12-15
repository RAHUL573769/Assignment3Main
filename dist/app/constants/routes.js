"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_routes_1 = __importDefault(require("../modules/category/category.routes"));
const course_routes_1 = __importDefault(require("../modules/course/course.routes"));
const review_routes_1 = __importDefault(require("../modules/review/review.routes"));
const routes = [
    {
        path: '/course',
        router: course_routes_1.default,
    },
    {
        path: '/categories',
        router: category_routes_1.default,
    },
    {
        path: '/reviews',
        router: review_routes_1.default,
    },
];
exports.default = routes;
