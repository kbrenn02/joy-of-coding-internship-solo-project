import { z } from 'zod';

export const createTaskSchema = z.object ({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required'),
    due: z.string().min(1, 'Due date for the task is required. This can be changed later.').transform((str) => new Date())
});