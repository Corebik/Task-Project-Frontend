import { AddTaskModal, EditTaskData, TaskList, TaskModalDetails } from '@/components';
import { isManager } from '@/helpers/policies';
import { useAuth, useGetProject } from '@/hooks';
import { useMemo } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const ProjectDetailsPage = () => {
   const navigate = useNavigate();
   const { data: user, isLoading: authLoading } = useAuth();
   const { isError, isLoading, data } = useGetProject();

   const canEdit = useMemo(() => data?.project.manager === user?._id, [data, user]);

   if (isLoading && authLoading) return <div>Loading...</div>;

   if (isError) return <Navigate to="/404" />;

   if (data && user)
      return (
         <>
            <h1 className="text-5xl font-black">{data.project.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.project.description}</p>

            {isManager(data.project.manager, user._id) && (
               <nav className="my-5 flex gap-3">
                  <button
                     type="button"
                     className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                     onClick={() => navigate('?newTask=true')}
                  >
                     Agregar Tarea
                  </button>
                  <Link
                     className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                     to={'team'}
                  >
                     Colaboradores
                  </Link>
               </nav>
            )}

            <TaskList tasks={data.project.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
         </>
      );
};
