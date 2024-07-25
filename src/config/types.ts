import zod from "zod";

export const submissionSchema = zod.object({
    assignmentId: zod.string(),
    questionId: zod.string(),
    answer: zod.string()
});

export type SubmissionBody = zod.infer<typeof submissionSchema>;