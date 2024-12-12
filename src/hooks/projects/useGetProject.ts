import { getProjectById } from '@/api/ProjectAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useGetProject = () => {
   const params = useParams();
   const projectId = params.projectId!;

   const { data, isLoading, isError } = useQuery({
      queryKey: ['project', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
      // enabled: !!projectId,
   });

   return {
      //*Getters
      projectId,
      //*Params
      data,
      isLoading,
      isError,
   };
};
