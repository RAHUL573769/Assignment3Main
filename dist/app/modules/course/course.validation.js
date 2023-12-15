"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Name is required',
    }),
    isDeleted: zod_1.z.boolean().optional(),
});
const DetailValidationSchema = zod_1.z.object({
    level: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Level is required',
    }),
    description: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Description is required',
    }),
});
const CourseValidationSchema = zod_1.z.object({
    title: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Title is required',
    }),
    instructor: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Instructor is required',
    }),
    categoryId: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Category Id is required',
    }),
    price: zod_1.z.number().refine((value) => value >= 0, {
        message: 'Price is required and must be non-negative',
    }),
    tags: zod_1.z.array(TagValidationSchema),
    startDate: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Start Date is required',
    }),
    endDate: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'End Date is required',
    }),
    language: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Language is required',
    }),
    provider: zod_1.z.string().refine((value) => value.trim().length > 0, {
        message: 'Provider is required',
    }),
    details: DetailValidationSchema,
});
exports.default = CourseValidationSchema;
