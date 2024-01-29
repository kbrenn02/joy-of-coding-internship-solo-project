import { z } from 'zod';

export const createTaskSchema = z.object ({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required'),
    due: z.string().min(1, 'Due date for the task is required. This can be changed later.') // point 1
});

/* 
1.  When trying to post an example task, there was a continual error about submitting a date type. Unable to figure out
    how to differentiate a date type, I found that I could transform the string into a "new Date()" and it shows up in the 
    db in the format YYYY-MM-DD
*/