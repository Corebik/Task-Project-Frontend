import { getTaskById } from '@/api/TaskAPI';
import { Project, Task } from '@/types';
import { useQuery } from '@tanstack/react-query';

type GetTaskProps = {
   projectId: Project['_id'];
   taskId: Task['_id'];
};

export const useGetTask = ({ projectId, taskId }: GetTaskProps) => {
   const { data, isError, error } = useQuery({
      queryKey: ['task', taskId],
      queryFn: () => getTaskById({ projectId, taskId }),
      enabled: !!taskId,
      retry: false,
   });

   return {
      data,
      isError,
      error,
   };
};
