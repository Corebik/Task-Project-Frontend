import { useValidateToken } from '@/hooks';
import { AuthToken } from '@/types';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type NewPasswordTokenProps = {
   token: AuthToken['token'];
   setToken: Dispatch<SetStateAction<string>>;
   setIsValidToken: Dispatch<SetStateAction<boolean>>;
};

export const NewPasswordToken = ({ token, setToken, setIsValidToken }: NewPasswordTokenProps) => {
   const { mutate } = useValidateToken({ setIsValidToken: setIsValidToken });

   const handleChange = (token: AuthToken['token']) => {
      setToken(token);
   };
   const handleComplete = (token: AuthToken['token']) => {
      mutate({ token });
   };

   return (
      <>
         <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
            <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
            <div className="flex justify-center gap-5">
               <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                  <PinInputField className="h-10 w-10 px-[0.90rem] py-[0.75rem] rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="h-10 w-10 px-[0.90rem] py-[0.75rem] rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="h-10 w-10 px-[0.90rem] py-[0.75rem] rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="h-10 w-10 px-[0.90rem] py-[0.75rem] rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="h-10 w-10 px-[0.90rem] py-[0.75rem] rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="h-10 w-10 px-[0.90rem] py-[0.75rem] rounded-lg border-gray-300 border placeholder-white" />
               </PinInput>
            </div>
         </form>
         <nav className="mt-10 flex flex-col space-y-4">
            <Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">
               Solicitar un nuevo Código
            </Link>
         </nav>
      </>
   );
};
