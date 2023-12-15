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
/* eslint-disable @typescript-eslint/no-explicit-any */
const review_model_1 = __importDefault(require("../review/review.model"));
const course_model_1 = __importDefault(require("./course.model"));
const createCourseIntoDB = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(courseData);
    return result;
});
const updateCourseIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tags = yield course_model_1.default.findById({ _id: id }, {
        tags: 1,
    });
    // eslint-disable-next-line no-unsafe-optional-chaining
    const combinedTags = [...tags.tags, ...((data === null || data === void 0 ? void 0 : data.tags) || '')];
    // Handled Tags Modification.
    const uniqueItemsMap = new Map();
    combinedTags.forEach((item) => {
        const key = item.name;
        if (uniqueItemsMap.has(key)) {
            if (!item.isDeleted) {
                uniqueItemsMap.set(key, { name: item.name, isDeleted: false });
            }
            else if (item.isDeleted &&
                uniqueItemsMap.get(key).isDeleted === false) {
                uniqueItemsMap.delete(key);
            }
        }
        else {
            uniqueItemsMap.set(key, { name: item.name, isDeleted: false });
        }
    });
    const modifiedArray = Array.from(uniqueItemsMap.values());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = yield course_model_1.default.findOneAndUpdate({ _id: id }, {
        $set: {
            title: data === null || data === void 0 ? void 0 : data.title,
            instructor: data === null || data === void 0 ? void 0 : data.instructor,
            categoryId: data === null || data === void 0 ? void 0 : data.categoryId,
            price: data === null || data === void 0 ? void 0 : data.price,
            tags: modifiedArray,
            startDate: data === null || data === void 0 ? void 0 : data.startDate,
            endDate: data === null || data === void 0 ? void 0 : data.endDate,
            language: data === null || data === void 0 ? void 0 : data.language,
            provider: data === null || data === void 0 ? void 0 : data.provider,
            'details.level': (_a = data === null || data === void 0 ? void 0 : data.details) === null || _a === void 0 ? void 0 : _a.level,
            'details.description': (_b = data === null || data === void 0 ? void 0 : data.details) === null || _b === void 0 ? void 0 : _b.description,
        },
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const getCourseWithReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.find({ _id: id });
    const review = yield review_model_1.default.find({ courseId: id });
    const courseObj = course[0];
    const result = {
        course: Object.assign({}, courseObj['_doc']),
        review: review,
    };
    return result;
});
const getBestCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const averageReview = yield review_model_1.default.aggregate([
        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                reviewCount: { $sum: 1 },
            },
        },
        {
            $sort: {
                averageRating: -1,
            },
        },
    ]);
    const bestCourse = averageReview[0];
    const bestCourseObj = yield course_model_1.default.findOne({ _id: bestCourse._id });
    const result = {
        course: Object.assign({}, bestCourseObj['_doc']),
        averageRating: bestCourse === null || bestCourse === void 0 ? void 0 : bestCourse.averageRating,
        reviewCount: bestCourse === null || bestCourse === void 0 ? void 0 : bestCourse.reviewCount,
    };
    return result;
});
const getAllCourse = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, sortBy, sortOrder, minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level, } = searchQuery;
    const pipeline = [];
    // Filtering Course Data
    const matchStage = {};
    if (minPrice !== undefined && maxPrice !== undefined) {
        matchStage.price = {
            $gte: parseFloat(minPrice),
            $lte: parseFloat(maxPrice),
        };
    }
    if (tags) {
        matchStage['tags.name'] = tags;
    }
    if (startDate && endDate) {
        matchStage.startDate = {
            $gte: startDate,
            $lte: endDate,
        };
    }
    if (language) {
        matchStage.language = language;
    }
    if (provider) {
        matchStage.provider = provider;
    }
    if (durationInWeeks !== undefined) {
        matchStage.durationInWeeks = durationInWeeks;
    }
    if (level) {
        matchStage['details.level'] = level;
    }
    if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
    }
    // Sorting Course Data
    const sortStage = {};
    if (sortBy) {
        sortStage[sortBy] = sortOrder === 'desc' ? -1 : 1;
        pipeline.push({ $sort: sortStage });
    }
    // Skip and Limit
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: parseInt(limit, 10) });
    // const durationCalculationStage = {
    //   $addFields: {
    //     durationInWeeks: {
    //       $ceil: {
    //         $divide: [
    //           {
    //             $subtract: [{ $toDate: '$endDate' }, { $toDate: '$startDate' }],
    //           },
    //           1000 * 60 * 60 * 24 * 7,
    //         ],
    //       },
    //     },
    //   },
    // };
    // pipeline.push(durationCalculationStage);
    // Executing aggregation
    const aggregation = course_model_1.default.aggregate(pipeline);
    const result = yield aggregation.exec();
    // Counting total documents for pagination
    const totalCourses = yield course_model_1.default.countDocuments(matchStage);
    const usefulData = {
        data: result,
        totalCourses,
        page,
        limit,
    };
    return usefulData;
});
const courseService = {
    createCourseIntoDB,
    getAllCourse,
    updateCourseIntoDB,
    getCourseWithReviewFromDB,
    getBestCourseFromDB,
};
exports.default = courseService;
