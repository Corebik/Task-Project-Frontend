import { z } from 'zod';
import { userSchema } from './authUserTypes';
import { TaskSchema } from './taskTypes';

//*Projects Schemas
export const projectSchema = z.object({
   _id: z.string(),
   projectName: z.string(),
   clientName: z.string(),
   description: z.string(),
   tasks: z.array(z.string()),
   manager: z.string(
      userSchema.pick({
         _id: true,
      }),
   ),
   createdAt: z.string(),
   updatedAt: z.string(),
});

export const ProjectSchema = z.object({
   _id: z.string(),
   projectName: z.string(),
   clientName: z.string(),
   description: z.string(),
   tasks: z.array(TaskSchema),
   manager: z.string(
      userSchema.pick({
         _id: true,
      }),
   ),
   createdAt: z.string(),
   updatedAt: z.string(),
});

//*Project Response Schema
export const GetProjectSchema = z.object({
   ok: z.boolean(),
   project: ProjectSchema,
});

export const GetProjectsSchema = z.object({
   ok: z.boolean(),
   projects: z.array(projectSchema),
});

export const PostProjectSchema = z.object({
   ok: z.boolean(),
   msg: z.string(),
   project: projectSchema,
});

//*Projects Types
export type Project = z.infer<typeof projectSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;

//* QueryClient Optimistic Response Type

const prevData = z.object({
   ok: z.boolean(),
   project: z.object({
      _id: z.string(),
      projectName: z.string(),
      clientName: z.string(),
      description: z.string(),
      tasks: z.array(
         z.object({
            _id: z.string(),
            name: z.string(),
            description: z.string(),
            project: z.string(),
            status: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
         }),
      ),
      manager: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
   }),
});

export type PrevProject = z.infer<typeof prevData>;
