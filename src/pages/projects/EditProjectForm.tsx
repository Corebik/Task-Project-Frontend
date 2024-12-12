import { ProjectForm } from '@/components';
import { useEditProject } from '@/hooks';
import { Project, ProjectFormData } from '@/types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type EditProjectFormProps = {
   data: ProjectFormData;
   projectId: Project['_id'];
};

export const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {
   const { projectName, clientName, description } = data;
   const { mutate } = useEditProject({ projectId });

   const iniialValues: ProjectFormData = {
      projectName: projectName,
      clientName: clientName,
      description: description,
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: iniialValues });

   const handleForm = (formData: ProjectFormData) => {
      const data = { formData, projectId };
      mutate(data);
   };

   return (
      <div className="max-w-3xl mx-auto">
         <h1 className="text-4xl font-black">Editar Proyecto</h1>
         <p className="text-xl font-light text-gray-500 mt-2">Formulario para editar el proyecto</p>
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
               value="Guardar Cambios"
               className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
            />
         </form>
      </div>
   );
};
