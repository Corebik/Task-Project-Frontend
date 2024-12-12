import { NotesPanel } from '@/components';
import { formatDate } from '@/helpers/formatDate';
import { useGetTask, useIdentifyTask, useUpdateStatus } from '@/hooks';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TaskModalDetails() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const { projectId, taskId } = useIdentifyTask({ variable: 'viewTask' });

   const { data, isError, error } = useGetTask({ projectId, taskId });

   const { mutate } = useUpdateStatus({ projectId, taskId });

   useEffect(() => {
      if (isError) {
         toast.error(error?.message, { toastId: 'error' });
         queryClient.removeQueries({ queryKey: ['task', taskId] });
      }
   }, [isError, error, taskId, queryClient]);

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const status = e.target.value as TaskStatus;
      const data = { projectId, taskId, status };

      mutate(data);
   };

   if (isError) {
      return <Navigate to={`/projects/${projectId}`} />;
   }

   const show = taskId ? true : false;

   if (data)
      return (
         <>
            <Transition appear show={show} as={Fragment}>
               <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
                              <p className="text-sm text-slate-400">Agregada el: {formatDate(data.task.createdAt)}</p>
                              <p className="text-sm text-slate-400">Última actualización: {formatDate(data.task.updatedAt)}</p>
                              <DialogTitle as="h3" className="font-black text-4xl text-slate-600 my-5">
                                 {data.task.name}
                              </DialogTitle>
                              <p className="text-lg text-slate-500 mb-2">Descripción: {data.task.description}</p>

                              {data.task.completedBy?.length ? (
                                 <>
                                    <p className="font-bold text-2xl text-slate-600 my-5">Historial de Cambios</p>
                                    <ul className="list-decimal">
                                       {data.task.completedBy?.map((change) => (
                                          <li key={change._id}>
                                             <span className="font-bold text-slate-600">{statusTranslations[change.status]} </span>por:{' '}
                                             {change.user.name}
                                          </li>
                                       ))}
                                    </ul>
                                 </>
                              ) : null}

                              <div className="my-5 space-y-3">
                                 <label className="font-bold" htmlFor="status">
                                    Estado Actual:
                                 </label>
                                 <select
                                    name="status"
                                    id="status"
                                    className="w-full p-3 bg-white border border-gray-300"
                                    defaultValue={data.task.status}
                                    onChange={handleChange}
                                 >
                                    {Object.entries(statusTranslations).map(([key, value]) => (
                                       <option key={key} value={key}>
                                          {value}
                                       </option>
                                    ))}
                                 </select>
                              </div>

                              <NotesPanel notes={data.task.notes} />
                           </DialogPanel>
                        </TransitionChild>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </>
      );
}
