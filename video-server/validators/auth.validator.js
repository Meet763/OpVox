import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    mobileNumber: z.string().optional(),
    password: z.string().min(6, 'Password should be at least 6 characters'),
    role: z.string(),
    
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password is required'),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').optional(),
  email: z.string().email('Invalid email address').optional(),
  mobileNumber: z.string().optional(),
  password: z.string().min(6, 'Password should be at least 6 characters').optional(),
})
