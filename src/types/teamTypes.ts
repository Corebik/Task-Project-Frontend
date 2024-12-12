import { z } from 'zod';
import { userSchema } from '.';

//*Team Schemas
export const teamMemberSchema = userSchema.pick({
   _id: true,
   name: true,
   email: true,
});

export const teamMembersSchema = z.object({
   ok: z.boolean(),
   team: z.array(teamMemberSchema),
});

//*Team Types
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
