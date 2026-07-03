import { z } from 'zod'

export const enquirySchema = z.object({
  studentName: z.string().min(2, 'Please enter the student name'),
  parentName: z.string().min(2, 'Please enter your name'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^[0-9+\-\s]{10,15}$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  age: z
    .string()
    .min(1, 'Age is required')
    .refine((v) => Number(v) >= 5, 'Students must be 5 years or above'),
  branch: z.string().min(1, 'Please choose a centre'),
  level: z.string().min(1, 'Please choose a level'),
  message: z.string().max(500).optional().or(z.literal('')),
})

export type EnquiryForm = z.infer<typeof enquirySchema>
