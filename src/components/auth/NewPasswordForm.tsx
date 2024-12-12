import { ErrorMessage } from '@/components/ErrorMessage';
import { useNewPassword } from '@/hooks';
import type { AuthToken, NewPassword } from '@/types';
import { useForm } from 'react-hook-form';

const initialValues: NewPassword = {
   password: '',
   confirmPassword: '',
};

export const NewPasswordForm = ({ token }: { token: AuthToken['token'] }) => {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const { mutate } = useNewPassword({ reset });

   const handleNewPassword = (formData: NewPassword) => {
      const data = {
         formData,
         token,
      };
      mutate(data);
   };

   const password = watch('password');

   return (
      <>
         <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-8 p-10  bg-white mt-10" noValidate>
            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl">Contraseña</label>

               <input
                  type="password"
                  placeholder="Contraseña de Registro"
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
               <label className="font-normal text-2xl">Repetir Contraseña</label>

               <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repite la Contraseña de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('confirmPassword', {
                     required: 'Repetir Password es obligatorio',
                     validate: (value) => value === password || 'Los Passwords no son iguales',
                  })}
               />

               {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
            </div>

            <input
               type="submit"
               value="Establecer Contraseña"
               className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
            />
         </form>
      </>
   );
};
