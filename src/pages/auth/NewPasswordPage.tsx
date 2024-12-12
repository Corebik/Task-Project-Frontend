import { NewPasswordForm, NewPasswordToken } from '@/components';
import type { AuthToken } from '@/types';
import { useState } from 'react';

export const NewPasswordPage = () => {
   const [token, setToken] = useState<AuthToken['token']>('');
   const [isValidToken, setIsValidToken] = useState(false);

   return (
      <>
         <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
         <p className="text-2xl font-light text-white mt-5">
            Ingresa el código que recibiste {''}
            <span className=" text-fuchsia-500 font-bold"> en tu email</span>
         </p>

         {!isValidToken ? (
            <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
         ) : (
            <NewPasswordForm token={token} />
         )}
      </>
   );
};
