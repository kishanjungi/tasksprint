import { z } from "zod";

export const createQuestionSchema = z.object({
  question: z.string(),

  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),

  correctAnswer: z.string(),

  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),

  categoryId: z.string(),
});