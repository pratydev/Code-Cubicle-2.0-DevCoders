"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const assignmentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    questions: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
        }]
}, {
    timestamps: true
});
const Assignment = mongoose_1.default.model('Assignment', assignmentSchema);
exports.default = Assignment;
