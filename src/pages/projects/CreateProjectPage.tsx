import { ProjectForm } from '@/components';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useCreateProject } from '@/hooks';
import type { ProjectFormData } from '@/types';

const iniialValues: ProjectFormData = {
   projectName: '',
   clientName: '',
   description: '',
};

export const CreateProjectPage = () => {
   const { mutate } = useCreateProject();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: iniialValues });

   const handleForm = (formData: ProjectFormData) => mutate(formData);

   return (
      <div className="max-w-3xl mx-auto">
         <h1 className="text-4xl font-black">Crear Proyecto</h1>
         <p className="text-xl font-light text-gray-500 mt-2">
            Llena el siguiente formulario para crear un proyecto
         </p>
         <nav className="my-8">
            <Link
               className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
               font-bold cursor-pointer transition-colors"
               to="/"
            >
               Volver a Proyectos
            </Link>
         </nav>
         <form
            className="mt-10 bg-white shadow-lg p-10 rounded-lg"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >
            <ProjectForm register={register} errors={errors} />

            <input
               type="submit"
               value="Crear Proyecto"
               className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
            />
         </form>
      </div>
   );
};
