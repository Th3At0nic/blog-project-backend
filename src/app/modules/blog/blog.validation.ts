import { z } from 'zod';

// Zod schema for TBlog validation
export const blogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'), // Ensures title is a non-empty string
    content: z.string().min(1, 'Content is required'), // Ensures content is a non-empty string
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(), // Ensures title is a non-empty string
    content: z.string().min(1, 'Content is required').optional(), // Ensures content is a non-empty string
  }),
});
