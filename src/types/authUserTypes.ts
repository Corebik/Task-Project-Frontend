import { z } from 'zod';

//* Auth Schemas
const authSchema = z.object({
   name: z.string(),
   email: z.string().email(),
   password: z.string(),
   confirmPassword: z.string(),
   token: z.string(),
   currentPassword: z.string(),
});

//? Auth Types
export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegisterForm = Pick<Auth, 'name' | 'email' | 'password' | 'confirmPassword'>;
export type AuthToken = Pick<Auth, 'token'>;
export type UserConfirmCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPassword = Pick<Auth, 'password' | 'confirmPassword'>;
export type UpdateCurrentPasswordForm = Pick<Auth, 'password' | 'confirmPassword' | 'currentPassword'>;
export type checkPasswordForm = Pick<Auth, 'password'>;

//* Users Schemas
export const userSchema = authSchema
   .pick({
      name: true,
      email: true,
   })
   .extend({
      _id: z.string(),
   });

//? Users Types
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;
