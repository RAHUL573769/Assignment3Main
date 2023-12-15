"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Course Id is required'],
        ref: 'Course',
    },
    rating: { type: Number, required: [true, 'Rating is required'] },
    review: {
        type: String,
        required: [true, 'Review description is required'],
    },
}, { versionKey: false });
const Review = (0, mongoose_1.model)('Review', ReviewSchema);
exports.default = Review;
