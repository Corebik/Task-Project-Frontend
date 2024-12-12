import { ErrorMessage } from '@/components';
import { useIdentifyTask } from '@/hooks';
import { useCreateNote } from '@/hooks/notes/useCreateNote';
import { NoteFormData } from '@/types';
import { useForm } from 'react-hook-form';

const initialValue: NoteFormData = {
   content: '',
};

export const AddNoteForm = () => {
   const { projectId, taskId } = useIdentifyTask({ variable: 'viewTask' });

   const {
      reset,
      handleSubmit,
      formState: { errors },
      register,
   } = useForm({ defaultValues: initialValue });

   const mutation = useCreateNote({ reset, taskId });

   const handleAddNote = (formData: NoteFormData) => {
      const data = { projectId, taskId, formData };
      mutation.mutate(data);
   };

   return (
      <form
         onSubmit={handleSubmit(handleAddNote)}
         className="space-y-3"
         noValidate //Para que no se envie el formulario, no valide, sino que lo hagamos mediante React Hook Form
      >
         <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">
               Crear Nota
            </label>
            <input
               id="content"
               type="text"
               className="w-full p-3 border border-gray-300"
               placeholder="Contenido de la nota"
               {...register('content', { required: 'El contenido es obligatorio' })}
            />
            {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
         </div>

         <input
            type="submit"
            value="Crear Nota"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 duration-300 w-full p-2 text-white font-black cursor-pointer"
         />
      </form>
   );
};
