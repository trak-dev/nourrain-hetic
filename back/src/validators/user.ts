import { z } from 'zod';
import { User } from '../models/user.model';

export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstname: z.string(),
    lastname: z.string(),
});

export interface RegisterUserInput extends z.infer<typeof registerUserSchema> {}

export const loginInterfaceSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export interface loginInterface extends z.infer<typeof loginInterfaceSchema> {}