import { Link } from 'react-router-dom';

export const NotFound = () => {
   return (
      <>
         <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>
         <p className="mt-10 text-center text-white">
            ¿Quieres regresar a{' '}
            <Link to="/" className="text-fuchsia-500">
               Proyectos?
            </Link>
         </p>
      </>
   );
};
