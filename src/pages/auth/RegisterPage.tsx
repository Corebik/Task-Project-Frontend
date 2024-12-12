import { ErrorMessage } from '@/components/ErrorMessage';
import { useCreateUser } from '@/hooks';
import { UserRegisterForm } from '@/types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const initialValues: UserRegisterForm = {
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
};

export const RegisterPage = () => {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm<UserRegisterForm>({ defaultValues: initialValues });

   const { mutate } = useCreateUser();

   const password = watch('password');

   const handleRegister = (formData: UserRegisterForm) => {
      mutate(formData);
      reset();
   };

   return (
      <>
         <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
         <p className="text-2xl font-light text-white mt-5">
            Llena el formulario para {''}
            <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
         </p>

         <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-8 p-10  bg-white mt-10"
            noValidate
         >
            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl" htmlFor="email">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('email', {
                     required: 'El Email de registro es obligatorio',
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'E-mail no válido',
                     },
                  })}
               />
               {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl">Nombre</label>
               <input
                  type="name"
                  placeholder="Nombre de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('name', {
                     required: 'El Nombre de usuario es obligatorio',
                  })}
               />
               {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl">Password</label>

               <input
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('password', {
                     required: 'El Password es obligatorio',
                     minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres',
                     },
                  })}
               />
               {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl">Repetir Password</label>

               <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Repite Password de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('confirmPassword', {
                     required: 'Repetir Password es obligatorio',
                     validate: (value) => value === password || 'Los Passwords no son iguales',
                  })}
               />

               {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
               )}
            </div>

            <input
               type="submit"
               value="Registrarme"
               className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
            />
         </form>

         <nav className="mt-10 flex flex-col space-y-2">
            <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">
               ¿Ya tienes cuenta?{' '}
               <span className="text-fuchsia-600 font-bold hover:text-fuchsia-700 duration-300">
                  Iniciar Sesión
               </span>
            </Link>
            <Link to={'/auth/forgot-password'} className="text-center text-gray-300 font-normal">
               ¿Olvidaste tu contraseña?{' '}
               <span className="text-fuchsia-600 font-bold hover:text-fuchsia-700 duration-300">
                  Reestablecer
               </span>
            </Link>
         </nav>
      </>
   );
};