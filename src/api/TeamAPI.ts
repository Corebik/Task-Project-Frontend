import api from '@/lib/axios';
import { Project, ServerResponse, TeamMember, TeamMemberForm, teamMembersSchema } from '@/types';
import { isAxiosError } from 'axios';

export const findUserByEmail = async ({ projectId, formData }: { projectId: Project['_id']; formData: TeamMemberForm }) => {
   try {
      const { data } = await api.post(`/projects/${projectId}/team/find`, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const addUserToProject = async ({ projectId, id }: { projectId: Project['_id']; id: TeamMember['_id'] }) => {
   try {
      const { data } = await api.post<ServerResponse>(`/projects/${projectId}/team`, { id });
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const getProjectTeam = async ({ projectId }: { projectId: Project['_id'] }) => {
   try {
      const { data } = await api.get(`/projects/${projectId}/team`);
      const response = teamMembersSchema.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};

export const removeUserFromProject = async ({ projectId, userId }: { projectId: Project['_id']; userId: TeamMember['_id'] }) => {
   try {
      const { data } = await api.delete<ServerResponse>(`/projects/${projectId}/team/${userId}`);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.msg);
      }
   }
};
