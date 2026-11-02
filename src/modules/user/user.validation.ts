import { z } from 'zod';

export const registerUserSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),

    email: z
        .string()
        .trim()
        .email('Format email tidak valid')
        .max(255, 'Email terlalu panjang')
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .max(72, 'Password maksimal 72 karakter')

}).strict();

export type RegisterUserRequest = z.infer<
    typeof registerUserSchema
>;