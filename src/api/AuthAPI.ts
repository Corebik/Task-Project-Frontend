import api from '@/lib/axios';
import {
   AuthToken,
   checkPasswordForm,
   ForgotPasswordForm,
   NewPassword,
   ServerLoginResponse,
   ServerResponse,
   UserConfirmCodeForm,
   UserLoginForm,
   userSchema,
} from '@/types';
import { isAxiosError } from 'axios';

export const createAccount = async (formData: UserLoginForm) => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/create-account', formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const confirmAccount = async (token: AuthToken) => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/confirm-account', token);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const requestCode = async (email: UserConfirmCodeForm) => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/request-code', email);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const login = async (formData: UserLoginForm) => {
   try {
      const { data } = await api.post<ServerLoginResponse>('/auth/login', formData);
      localStorage.setItem('AUTH_TOKEN', data.token);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/forgot-password', formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const validateToken = async (formData: AuthToken) => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/validate-token', formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};
export const updatePasswordWithToken = async ({ formData, token }: { formData: NewPassword; token: AuthToken['token'] }) => {
   try {
      const { data } = await api.post<ServerResponse>(`/auth/update-password/${token}`, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const getUser = async () => {
   try {
      const { data } = await api.get('/auth/user');
      const response = userSchema.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const checkPassword = async (formData: checkPasswordForm): Promise<ServerResponse | undefined> => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/check-password', formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};
