import { z } from 'zod';
import { noteSchema } from './noteTypes';

//*Tasks Schemas
export const TaskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);

export const TaskSchema = z.object({
   _id: z.string(),
   name: z.string(),
   description: z.string(),
   project: z.string(),
   status: TaskStatusSchema,
   // notes: z.array(
   //    z.object({
   //       _id: z.string(),
   //       content: z.string(),
   //       createdBy: z.object({ _id: z.string(), name: z.string() }),
   //       task: z.string(),
   //    }),
   // ),
   createdAt: z.string(),
   updatedAt: z.string(),
});

export const PostTaskSchema = z.object({
   ok: z.boolean(),
   msg: z.string(),
   task: TaskSchema,
});

export const GetTaskResponse = z.object({
   ok: z.boolean(),
   task: TaskSchema.extend({
      completedBy: z
         .array(
            z.object({
               user: z.object({ name: z.string(), email: z.string() }),
               status: z.string(),
               _id: z.string(),
            }),
         )
         .or(z.null()),
      notes: z.array(noteSchema),
   }),
});

//*Tasks Types
export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type PostTaskSchema = z.infer<typeof PostTaskSchema>;
export type GetTaskResponse = z.infer<typeof GetTaskResponse>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
