import { useDroppable } from '@dnd-kit/core';

type DropTaskProps = {
   status: string;
};

export const DropTask = ({ status }: DropTaskProps) => {
   const { isOver, setNodeRef } = useDroppable({ id: status });

   const style = {
      opacity: isOver ? 0.4 : undefined,
   };

   return (
      <div
         style={style}
         ref={setNodeRef}
         className="text-sm font-semibold uppercase p-2 border border-dashed border-slate-500 my-5 grid place-content-center text-slate-500"
      >
         Soltar Tarea Acá
      </div>
   );
};
