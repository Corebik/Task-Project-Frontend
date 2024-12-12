import { confirmAccount } from '@/api/AuthAPI';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useConfirmAccount = () => {
   const { mutate } = useMutation({
      mutationFn: confirmAccount,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
      },
   });

   return { mutate };
};
