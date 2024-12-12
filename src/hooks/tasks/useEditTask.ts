import { updateTask } from '@/api/TaskAPI';
import { Project, Task, TaskFormData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type EditTaskProps = {
   projectId: Project['_id'];
   reset: UseFormReset<TaskFormData>;
   taskId: Task['_id'];
};

export const useEditTask = ({ projectId, reset, taskId }: EditTaskProps) => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: updateTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project', projectId] });
         queryClient.invalidateQueries({ queryKey: ['task', taskId] });
         toast.success(data?.msg);

         reset();
         navigate(location.pathname, { replace: true });
      },
   });

   return {
      mutate,
   };
};
