import { deleteTask } from '@/api/TaskAPI';
import { Project } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDeleteTask = ({ projectId }: { projectId: Project['_id'] }) => {
   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: deleteTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project', projectId] });
         toast.success(data?.msg);
      },
   });

   return {
      mutate,
   };
};
