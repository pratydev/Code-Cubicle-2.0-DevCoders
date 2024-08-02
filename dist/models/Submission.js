"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    question: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    assignment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Submission = mongoose_1.default.model('Submission', submissionSchema);
exports.default = Submission;
