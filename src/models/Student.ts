import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    pendingAssignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ],
    completedAssignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ]
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
export default Student;