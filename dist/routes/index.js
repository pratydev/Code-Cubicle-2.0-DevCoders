"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_1 = __importDefault(require("./student"));
const teacher_1 = __importDefault(require("./teacher"));
const questionController_1 = require("../controllers/questionController");
const storyController_1 = require("../controllers/storyController");
const router = (0, express_1.Router)();
router.use('/student', student_1.default);
router.use('/teacher', teacher_1.default);
router.post('/create-question', questionController_1.createQuestion);
router.post('/create-story', storyController_1.createStory);
exports.default = router;
