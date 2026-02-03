import { z } from "zod";

export const faqCreateSchema = z.object({
  question: z.string().min(3).max(200),
  answer: z.string().min(3).max(2000),
});

export const faqSchema = z.object({
  id: z.string(),
  sortOrder: z.number().int(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const faqListSchema = z.array(faqSchema);

export type FaqCreateInput = z.infer<typeof faqCreateSchema>;