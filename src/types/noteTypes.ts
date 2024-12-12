import { z } from 'zod';
import { userSchema } from './authUserTypes';

//*Notes Schemas
export const noteSchema = z.object({
   _id: z.string(),
   content: z.string(),
   createdBy: userSchema,
   task: z.string(),
   createdAt: z.string(),
});

//*Notes Types
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;
