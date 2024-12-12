import { EditTaskModal } from '@/components';
import { useGetTask, useIdentifyTask } from '@/hooks';
import { Navigate } from 'react-router-dom';

export const EditTaskData = () => {
   const { projectId, taskId } = useIdentifyTask({ variable: 'editTask' });

   const { data, isError } = useGetTask({ projectId, taskId });

   if (isError) return <Navigate to="/404" />;

   if (data) return <EditTaskModal data={data.task} />;
};
