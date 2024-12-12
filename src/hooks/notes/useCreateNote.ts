import { createNote } from '@/api/NoteAPI';
import { NoteFormData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
   reset: UseFormReset<NoteFormData>;
   taskId: string;
};

export const useCreateNote = ({ reset, taskId }: Props) => {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: createNote,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data.msg);
         queryClient.invalidateQueries({ queryKey: ['task', taskId] });
         reset();
      },
   });

   return mutation;
};
