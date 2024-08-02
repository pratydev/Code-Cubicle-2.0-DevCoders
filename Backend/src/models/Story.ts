import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        }
    ]

}, {
    timestamps: true
});

const Story = mongoose.model('Story', storySchema);
export default Story;