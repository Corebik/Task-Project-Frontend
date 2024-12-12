import api from '@/lib/axios';
import { GetProjectSchema, GetProjectsSchema, PostProjectSchema, ProjectFormData } from '@/types';
import { isAxiosError } from 'axios';

import type { Project, ServerResponse } from '@/types';

export const createProject = async (formData: ProjectFormData) => {
   try {
      const { data } = await api.post('/projects', formData);
      const response = PostProjectSchema.safeParse(data);
      if (response.success) {
         return response.data;
      }

      // return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const getProjects = async () => {
   try {
      const { data } = await api.get('/projects');
      const response = GetProjectsSchema.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const getProjectById = async (id: Project['_id']) => {
   try {
      const { data } = await api.get(`/projects/${id}`);
      const response = GetProjectSchema.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

type ProjectAPIType = {
   formData: ProjectFormData;
   projectId: Project['_id'];
};

export const updateProject = async ({ formData, projectId }: ProjectAPIType) => {
   try {
      const { data } = await api.put<ServerResponse>(`/projects/${projectId}`, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const deleteProject = async (id: Project['_id']) => {
   try {
      const { data } = await api.delete<ServerResponse>(`/projects/${id}`);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};
