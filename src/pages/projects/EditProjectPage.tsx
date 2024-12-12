import { useGetProject } from '@/hooks';
import { Navigate } from 'react-router-dom';
import { EditProjectForm } from './EditProjectForm';

export const EditProjectPage = () => {
   const { isError, isLoading, data, projectId } = useGetProject();

   if (isLoading) return <div>Loading...</div>;

   if (isError) return <Navigate to="/404" />;

   if (data) return <EditProjectForm data={data.project} projectId={projectId} />;
};
