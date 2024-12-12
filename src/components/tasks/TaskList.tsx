import { DropTask, TaskCard } from '@/components';
import { useUpdateStatus } from '@/hooks';
import { statusTranslations } from '@/locales/es';
import { PrevProject, Task, TaskStatus } from '@/types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type TaskListProps = {
   tasks: Task[];
   canEdit: boolean;
};

type GroupTasks = {
   [key: string]: Task[];
};

const initialStatusGroups: GroupTasks = {
   pending: [],
   onHold: [],
   inProgress: [],
   underReview: [],
   completed: [],
};

const statuStyles: { [key: string]: string } = {
   pending: 'border-t-slate-500',
   onHold: 'border-t-red-500',
   inProgress: 'border-t-blue-500',
   underReview: 'border-t-amber-500',
   completed: 'border-t-emerald-500',
};

export const TaskList = ({ tasks, canEdit }: TaskListProps) => {
   const queryClient = useQueryClient();
   const params = useParams();
   const projectId = params.projectId!;

   const { mutate } = useUpdateStatus({ projectId });

   //*TASKS GROUP
   const groupedTasks = tasks.reduce((acc, task) => {
      let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
      currentGroup = [...currentGroup, task];
      return { ...acc, [task.status]: currentGroup };
   }, initialStatusGroups);

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && over.id) {
         const taskId = active.id.toString();
         const status = over.id as TaskStatus;
         mutate({ projectId, taskId, status });

         queryClient.setQueryData(['project', projectId], (prevData: PrevProject) => {
            const updatedTasks = prevData.project.tasks.map((task) => {
               if (task._id === taskId) {
                  return { ...task, status };
               }

               return task;
            });

            return { ...prevData, project: { tasks: updatedTasks } };
         });
      }
   };

   return (
      <>
         <h2 className="text-5xl font-black my-10">Tareas</h2>

         <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
            <DndContext onDragEnd={handleDragEnd}>
               {Object.entries(groupedTasks).map(([status, tasks]) => (
                  <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
                     <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statuStyles[status]}`}>
                        {statusTranslations[status]}
                     </h3>

                     <DropTask status={status} />

                     <ul className="mt-5 space-y-5">
                        {tasks.length === 0 ? (
                           <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                        ) : (
                           tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                        )}
                     </ul>
                  </div>
               ))}
            </DndContext>
         </div>
      </>
   );
};
