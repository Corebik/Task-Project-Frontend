import { addUserToProject } from '@/api/TeamAPI';
import { TeamMember } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type searchResultProps = {
   user: TeamMember;
   reset: () => void;
};

export const SearchResult = ({ user, reset }: searchResultProps) => {
   const params = useParams();
   const projectId = params.projectId!;
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: addUserToProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
         reset();
         navigate(location.pathname, { replace: true });
         queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
      },
   });

   const handleAddUserToProject = () => {
      mutate({ projectId, id: user._id });
   };

   return (
      <>
         <p className="mt-10 text-center font-bold">Resultado:</p>
         <div className="flex justify-between items-center">
            <p className="text-black">{user.name}</p>
            <button onClick={handleAddUserToProject} className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer">
               Agregar al Proyecto
            </button>
         </div>
      </>
   );
};
