import { Logo, NavMenu } from '@/components';
import { useAuth } from '@/hooks';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppLayout = () => {
   const { data, isLoading, isError } = useAuth();

   if (isLoading) return <div>Cargando...</div>;

   if (isError) return <Navigate to="/auth/login" />;

   if (data)
      return (
         <>
            <header className="bg-gray-800 py-5 px-10">
               <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                  <Link to="/" className="min-w-40">
                     <Logo />
                  </Link>

                  <NavMenu name={data.name} />
               </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 px-10">
               <Outlet />
            </section>

            <footer className="py-5">
               <p className="text-center">Corebik © {new Date().getFullYear()} All rights reserved </p>
            </footer>

            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
         </>
      );
};
