import { createTask } from '@/api/TaskAPI';
import { TaskFormData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useCreateTask = () => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   //*MODAL
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const modalTask = queryParams.get('newTask');
   const show = modalTask ? true : false;
   //*ProjectId
   const projectId = useParams().projectId!;

   const initialValue: TaskFormData = {
      name: '',
      description: '',
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ defaultValues: initialValue });

   const { mutate } = useMutation({
      mutationFn: createTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project', projectId] });
         toast.success(data?.msg);
         reset();
         navigate(location.pathname, { replace: true });
      },
   });

   return {
      mutate,
      projectId,
      show,
      register,
      handleSubmit,
      errors,
   };
};
