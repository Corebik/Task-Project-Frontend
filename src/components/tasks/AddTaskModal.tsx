import { useCreateTask } from '@/hooks';
import { TaskFormData } from '@/types';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

export const AddTaskModal = () => {
   const navigate = useNavigate();
   const { mutate, projectId, show, register, handleSubmit, errors } = useCreateTask();

   const handleCreateTask = (formData: TaskFormData) => {
      const data = { formData, projectId };
      mutate(data);
   };

   return (
      <>
         <Transition appear show={show} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-10"
               onClose={() => navigate(location.pathname, { replace: true })}
            >
               <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/60" />
               </TransitionChild>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                           <DialogTitle as="h3" className="font-black text-4xl  my-5">
                              Nueva Tarea
                           </DialogTitle>

                           <p className="text-xl font-bold">
                              Llena el formulario y crea {''}
                              <span className="text-fuchsia-600">una tarea</span>
                           </p>

                           <form
                              className="mt-10 space-y-3"
                              noValidate
                              onSubmit={handleSubmit(handleCreateTask)}
                           >
                              <TaskForm errors={errors} register={register} />

                              <input
                                 type="submit"
                                 className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                 value="Guardar Tarea"
                              />
                           </form>
                        </DialogPanel>
                     </TransitionChild>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};
