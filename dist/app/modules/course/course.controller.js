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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("./course.service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const response_1 = require("../../utils/response");
const statusCode_1 = __importDefault(require("../../constants/statusCode"));
// Creating course: /api/course (post)
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = req.body;
    const result = yield course_service_1.default.createCourseIntoDB(newCourse);
    // Sending success response
    (0, response_1.successResponse)(res, {
        statusCode: statusCode_1.default.CREATED,
        message: 'Course created successfully',
        data: result,
    });
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.courseId;
    const data = req.body;
    const result = yield course_service_1.default.updateCourseIntoDB(id, data);
    (0, response_1.successResponse)(res, {
        statusCode: statusCode_1.default.OK,
        message: 'Course updated successfully',
        data: result,
    });
}));
const getCourseWithReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.courseId;
    const result = yield course_service_1.default.getCourseWithReviewFromDB(id);
    (0, response_1.successResponse)(res, {
        statusCode: statusCode_1.default.OK,
        message: 'Course and Reviews retrieved successfully',
        data: result,
    });
}));
const getBestCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.default.getBestCourseFromDB();
    (0, response_1.successResponse)(res, {
        statusCode: statusCode_1.default.OK,
        message: 'Best course retrieved successfully',
        data: result,
    });
}));
//Getting all course documents
const retrieveAllCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.default.getAllCourse(req.query);
    res.status(statusCode_1.default.OK).json({
        success: true,
        statusCode: statusCode_1.default.OK,
        message: 'Courses retrieved successfully',
        meta: {
            page: parseInt(result === null || result === void 0 ? void 0 : result.page),
            limit: parseInt(result === null || result === void 0 ? void 0 : result.limit),
            total: result === null || result === void 0 ? void 0 : result.totalCourses,
        },
        data: result.data,
    });
}));
const courseController = {
    createCourse,
    retrieveAllCourse,
    updateCourse,
    getCourseWithReview,
    getBestCourse,
};
exports.default = courseController;
