import { requestCode } from '@/api/AuthAPI';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useNewCode = () => {
   const { mutate } = useMutation({
      mutationFn: requestCode,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
      },
   });

   return { mutate };
};
