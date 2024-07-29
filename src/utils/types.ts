import zod from "zod";


// ZOD SCHEMAS
export const submissionSchema = zod.object({
    assignmentId: zod.string(),
    questionId: zod.string(),
    answer: zod.string()
});

export const assignmentSchema = zod.object({
    title: zod.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: zod.string().min(3, { message: "Description must be at least 3 characters long" }).optional(),
    subject: zod.string().min(3, { message: "Subject must be at least 3 characters long" }),
    totalMarks: zod.number(),
    totalQuestions: zod.number().min(1, { message: "Total Questions must be at least 1" }),
    questions: zod.array(zod.object({
        question: zod.string().min(3, { message: "Question must be at least 3 characters long" }),
        options: zod.array(zod.string().min(3, { message: "Option must be at least 3 characters long" })).min(2, { message: "At least 2 options are required" }),
        correctAnswer: zod.string().min(3, { message: "Correct Answer must be at least 3 characters long" }),
        marks: zod.number().min(1, { message: "Marks must be at least 1" })
    }))
});

export const teacherSignInSchema = zod.object({
    email: zod.string().email({ message: "Invalid email" }),
    password: zod.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const teacherSignUpSchema = zod.object({
    name: zod.string().min(3, { message: "Name must be at least 3 characters long" }).max(40, { message: "Name must be at most 40 characters long" }),
    email: zod.string().email({ message: "Invalid email" }),
    password: zod.string().min(8, { message: "Password must be at least 8 characters long" }),
    phoneNumber: zod.string().min(10, { message: "Phone number must be at least 10 characters long" }).max(13, { message: "Phone number must be at most 13 characters long" })
});



//TYPES
export type AssignmentBody = zod.infer<typeof assignmentSchema>;

export type TeacherSignInBody = zod.infer<typeof teacherSignInSchema>;

export type SubmissionBody = zod.infer<typeof submissionSchema>;

export type TeacherSignUpBody = zod.infer<typeof teacherSignUpSchema>;



//INTERFACES
export interface TeacherBody {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
}