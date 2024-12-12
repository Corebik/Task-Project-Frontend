import { createProject } from '@/api/ProjectAPI';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useCreateProject = () => {
   const navigate = useNavigate();

   const { mutate } = useMutation({
      mutationFn: createProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
         navigate('/');
      },
   });

   return {
      mutate,
   };
};
