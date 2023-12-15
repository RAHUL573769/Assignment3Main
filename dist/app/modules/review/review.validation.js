"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ReviewValidationSchema = zod_1.z.object({
    courseId: zod_1.z
        .string()
        .refine((courseId) => courseId.trim().length > 0, {
        message: 'Course Id is required',
    }),
    rating: zod_1.z
        .number()
        .int()
        .min(1)
        .max(5)
        .refine((rating) => rating >= 1 && rating <= 5, {
        message: 'Rating is required and must be between 1 and 5',
    }),
    review: zod_1.z
        .string()
        .min(1)
        .max(500)
        .refine((review) => review.trim().length > 0, {
        message: 'Review description is required',
    }),
});
exports.default = ReviewValidationSchema;
