"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
            type: String,
            required: true,
        }],
    correctAnswer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
const Question = mongoose_1.default.model('Question', questionSchema);
exports.default = Question;
