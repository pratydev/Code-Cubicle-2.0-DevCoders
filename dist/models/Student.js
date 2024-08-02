"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
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
    class: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    pendingAssignments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ],
    completedAssignments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ]
}, {
    timestamps: true
});
const Student = mongoose_1.default.model('Student', studentSchema);
exports.default = Student;
