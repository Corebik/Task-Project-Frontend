import { createAccount } from '@/api/AuthAPI';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useCreateUser = () => {
   const { mutate } = useMutation({
      mutationFn: createAccount,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
      },
   });

   return { mutate };
};
