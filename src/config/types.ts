import zod from "zod";

export const submissionSchema = zod.object({
    assignmentId: zod.string(),
    questionId: zod.string(),
    answer: zod.string()
});

export type SubmissionBody = zod.infer<typeof submissionSchema>;

export const assignmentSchema = zod.object({
    title: zod.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: zod.string().min(3, { message: "Description must be at least 3 characters long" }).optional(),
    subject: zod.string().min(3, { message: "Subject must be at least 3 characters long" }),
    totalMarks: zod.number(),
    totalQuestions: zod.number().min(1, { message: "Total Questions must be at least 1" }),
    questions: zod.array( zod.object({
        question: zod.string().min(3, { message: "Question must be at least 3 characters long" }),
        options: zod.array(zod.string().min(3, { message: "Option must be at least 3 characters long" })).min(2, { message: "At least 2 options are required" }),
        correctAnswer: zod.string().min(3, { message: "Correct Answer must be at least 3 characters long" }),
        marks: zod.number().min(1, { message: "Marks must be at least 1" })
    }))
});

export type AssignmentBody = zod.infer<typeof assignmentSchema>;