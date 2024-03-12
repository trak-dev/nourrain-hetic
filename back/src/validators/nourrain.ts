import { z } from "zod";

export const getOneInterfaceSchema = z.object({
  id: z.string(),
});

export const joinInterfaceSchema = z.object({
  code: z.string(),
});

export const createOneInterfaceSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});
