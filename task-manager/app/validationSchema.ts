import { z } from 'zod';

enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
  }

export const createTaskSchema = z.object ({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required'),
    due: z.string().min(1, 'Due date for the task is required. This can be changed later.').transform((str) => new Date()) // point 1
});

export const patchTaskSchema = z.object ({
    title: z.string().min(1, 'Title is required.').max(255).optional(),
    description: z.string().min(1, 'Description is required').optional(),
    due: z.string().min(1, 'Due date for the task is required. This can be changed later.').transform((str) => new Date(str)).optional(),
    status: z.nativeEnum(Status).optional()
})

/* 
1.  When trying to post an example task, there was a continual error about submitting a date type. Unable to figure out
    how to differentiate a date type, I found that I could transform the string into a "new Date()" and it shows up in the 
    db in the format
        Figure out how to make this so that the user has the option to select a date from a calendar to avoid input issues
*/