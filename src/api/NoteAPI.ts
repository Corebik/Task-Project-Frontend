import api from '@/lib/axios';
import { NoteFormData, Project, ServerResponse, Task } from '@/types';
import { isAxiosError } from 'axios';

type NodeAPIType = {
   formData: NoteFormData;
   projectId: Project['_id'];
   taskId: Task['_id'];
};

export const createNote = async ({
   projectId,
   taskId,
   formData,
}: Pick<NodeAPIType, 'projectId' | 'taskId' | 'formData'>): Promise<ServerResponse> => {
   try {
      const { data } = await api.post<ServerResponse>(`/projects/${projectId}/tasks/${taskId}/notes`, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
      throw error;
   }
};
