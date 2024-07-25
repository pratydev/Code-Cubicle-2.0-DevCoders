import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
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

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;