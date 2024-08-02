"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const storySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    audio: [
        {
            type: String,
            required: true
        }
    ],
    text: [
        {
            type: String,
            required: true
        }
    ],
    questions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Question",
            required: true
        }
    ]
}, {
    timestamps: true
});
const Story = mongoose_1.default.model('Story', storySchema);
exports.default = Story;
