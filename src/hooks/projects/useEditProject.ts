import { updateProject } from '@/api/ProjectAPI';
import { Project } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useEditProject = ({ projectId }: { projectId: Project['_id'] }) => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { mutate } = useMutation({
      mutationFn: updateProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });

         toast.success(data?.msg);
         navigate('/');
      },
   });

   return {
      mutate,
   };
};
