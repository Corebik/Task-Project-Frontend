import { deleteProject as deleteProjectAction } from '@/api/ProjectAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useDeleteProject = () => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   //!DELETE PROJECT
   const { mutate, mutateAsync } = useMutation({
      mutationFn: deleteProjectAction,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
         queryClient.invalidateQueries({ queryKey: ['projects'] });
         navigate(location.pathname, { replace: true });
      },
   });

   return {
      mutate,
      mutateAsync,
   };
};
