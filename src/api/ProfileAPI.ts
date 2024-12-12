import api from '@/lib/axios';
import { ServerResponse, UpdateCurrentPasswordForm, UserProfileForm } from '@/types';
import { isAxiosError } from 'axios';

export const updateProfile = async (formData: UserProfileForm) => {
   try {
      const { data } = await api.put<ServerResponse>('/auth/profile', formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
   try {
      const { data } = await api.post<ServerResponse>('/auth/update-password', formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};
