import api from '@/lib/axios';
import { Note, Project, ServerResponse, TaskFormData } from '@/types';
import { GetTaskResponse, PostTaskSchema, Task } from '@/types/taskTypes';
import { isAxiosError } from 'axios';

type TaskAPI = {
   formData: TaskFormData;
   projectId: Project['_id'];
   taskId: Task['_id'];
   status: Task['status'];
   noteId: Note['_id'];
};

export const createTask = async ({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) => {
   try {
      const url = `/projects/${projectId}/tasks`;
      const { data } = await api.post<PostTaskSchema>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const getTaskById = async ({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) => {
   try {
      const url = `projects/${projectId}/tasks/${taskId}`;
      const { data } = await api.get(url);
      const response = GetTaskResponse.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const updateTask = async ({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) => {
   try {
      const url = `projects/${projectId}/tasks/${taskId}`;
      const { data } = await api.put<ServerResponse>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const deleteTask = async ({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) => {
   try {
      const url = `projects/${projectId}/tasks/${taskId}`;
      const { data } = await api.delete<ServerResponse>(url);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const updateStatus = async ({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) => {
   try {
      const url = `projects/${projectId}/tasks/${taskId}/status`;
      const { data } = await api.post<ServerResponse>(url, { status });
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const deleteNote = async ({ projectId, taskId, noteId }: Pick<TaskAPI, 'projectId' | 'taskId' | 'noteId'>) => {
   try {
      const { data } = await api.delete<ServerResponse>(`projects/${projectId}/tasks/${taskId}/notes/${noteId}`);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};
