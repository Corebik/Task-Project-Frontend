import { deleteNote } from '@/api/TaskAPI';
import { formatDate } from '@/helpers/formatDate';
import { useAuth, useIdentifyTask } from '@/hooks';
import { Note } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { toast } from 'react-toastify';

type NoteDetailProps = {
   note: Note;
};

export const NoteDetail: FC<NoteDetailProps> = ({ note }) => {
   const { projectId, taskId } = useIdentifyTask({ variable: 'viewTask' });
   const { data, isLoading } = useAuth();
   const canDelete = useMemo(() => note.createdBy._id === data?._id, [data, note]);

   const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: deleteNote,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
         queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      },
   });

   if (isLoading) return 'Cargando...';

   return (
      <div className="p-3 flex justify-between items-center">
         <div>
            <p>
               <span className="font-bold">{note.createdBy.name}:</span> {note.content}
            </p>
            <p className="text-sm text-slate-500"> {formatDate(note.createdAt)}</p>
         </div>

         {canDelete && (
            <button
               type="button"
               className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
               onClick={() => mutate({ projectId, taskId, noteId: note._id })}
            >
               Eliminar
            </button>
         )}
      </div>
   );
};
