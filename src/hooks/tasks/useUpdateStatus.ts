import { updateStatus } from '@/api/TaskAPI';
import { Project, Task } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type UpdateStatusProps = {
   projectId: Project['_id'];
   taskId?: Task['_id'];
};

export const useUpdateStatus = ({ projectId, taskId }: UpdateStatusProps) => {
   const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: updateStatus,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project', projectId] });
         if (taskId) {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
         }
         toast.success(data?.msg);
      },
   });

   return {
      mutate,
   };
};
