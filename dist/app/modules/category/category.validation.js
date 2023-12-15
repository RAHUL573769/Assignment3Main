"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Category zod validation schema for validation middleware
const CategoryValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1)
        .max(255)
        .refine((data) => data.trim().length > 0, {
        message: 'Name is required',
    }),
});
exports.default = CategoryValidationSchema;
