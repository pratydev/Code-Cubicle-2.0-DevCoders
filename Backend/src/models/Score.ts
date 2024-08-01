import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    scores: [
        {
            assignment: {
                type: mongoose.Schema.Types.ObjectId,
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

const Score = mongoose.model('Score', scoreSchema);
export default Score;