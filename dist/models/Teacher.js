"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    students: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],
    assignments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ]
}, {
    timestamps: true
});
const Teacher = mongoose_1.default.model('Teacher', teacherSchema);
exports.default = Teacher;
