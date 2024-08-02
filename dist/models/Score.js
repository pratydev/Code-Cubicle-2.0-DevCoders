"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scoreSchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student'
    },
    scores: [
        {
            assignment: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Assignment'
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timestamps: true
});
const Score = mongoose_1.default.model('Score', scoreSchema);
exports.default = Score;
