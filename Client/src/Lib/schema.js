import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  username: z.string().min(1, "Username is required").max(100, "Name too long"),
  password: z.string().min(6, "At least 6 character"),
});

export const NoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long")
    .trim(),
  description: z.string().min(1, "Description is required"),
});

export const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "At least 6 character"),
});
