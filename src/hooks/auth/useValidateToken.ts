import { validateToken } from '@/api/AuthAPI';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type props = {
   setIsValidToken: Dispatch<SetStateAction<boolean>>;
};

export const useValidateToken = ({ setIsValidToken }: props) => {
   const { mutate } = useMutation({
      mutationFn: validateToken,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
         setIsValidToken(true);
      },
   });

   return {
      mutate,
   };
};
