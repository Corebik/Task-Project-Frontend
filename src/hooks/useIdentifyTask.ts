import { useLocation, useParams } from 'react-router-dom';

export const useIdentifyTask = ({ variable }: { variable: string }) => {
   const params = useParams();
   const projectId = params.projectId!;
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const taskId = queryParams.get(variable)!;

   return {
      projectId,
      taskId,
   };
};
