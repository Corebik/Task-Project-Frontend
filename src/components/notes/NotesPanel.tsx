import { AddNoteForm, NoteDetail } from '@/components';
import { Note } from '@/types';

type NotesPanelprops = {
   notes: Note[];
};

export const NotesPanel = ({ notes }: NotesPanelprops) => {
   return (
      <>
         <AddNoteForm />

         <div className="divide-y divide-gray-100 mt-10">
            {notes.length ? (
               <>
                  <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p>
                  {notes.map((note) => (
                     <NoteDetail key={note._id} note={note} />
                  ))}
               </>
            ) : (
               <p className="text-gray-500 text-center pt-3">No hay notas</p>
            )}
         </div>
      </>
   );
};
