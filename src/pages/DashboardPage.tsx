import { getProjects } from '@/api/ProjectAPI';
import { DeleteProjectModal, ProjectItem } from '@/components';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
export const DashboardPage = () => {
   const { data: user, isLoading: authLoading } = useAuth();

   const { data, isLoading } = useQuery({
      queryKey: ['projects'],
      queryFn: getProjects,
   });

   if (isLoading && authLoading) return <p>Cargando...</p>;

   if (data && user)
      return (
         <>
            <h1 className="text-4xl font-black">Mis Proyectos</h1>
            <p className="text-xl font-light text-gray-500 mt-2">Maneja y administra tus proyectos</p>

            <nav className="my-8">
               <Link
                  className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
         font-bold cursor-pointer transition-colors"
                  to="/projects/create"
               >
                  Nuevo Proyecto
               </Link>
            </nav>

            {data.projects.length ? (
               <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                  {data.projects.map((project) => (
                     <ProjectItem key={project._id} project={project} user={user._id} />
                  ))}
               </ul>
            ) : (
               <p className="text-center py-20">
                  No hay proyectos aún, {''}
                  <Link to="/projects/create" className="text-purple-500 font-bold">
                     Desea crear un nuevo proyeto?
                  </Link>
               </p>
            )}

            <DeleteProjectModal />
         </>
      );
};
