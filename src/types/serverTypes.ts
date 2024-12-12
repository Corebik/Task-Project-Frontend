import { z } from 'zod';

//*Server Schemas
export const serverResponseSchema = z.object({
   ok: z.boolean(),
   msg: z.string(),
   token: z.string(),
});

//*Server Types
export type ServerResponseSchema = z.infer<typeof serverResponseSchema>;
export type ServerResponse = Pick<ServerResponseSchema, 'ok' | 'msg'>;
export type ServerLoginResponse = Pick<ServerResponseSchema, 'ok' | 'token'>;
