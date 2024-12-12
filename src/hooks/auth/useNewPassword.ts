import { updatePasswordWithToken } from '@/api/AuthAPI';
import { NewPassword } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useNewPassword = ({ reset }: { reset: UseFormReset<NewPassword> }) => {
   const navigate = useNavigate();

   const { mutate } = useMutation({
      mutationFn: updatePasswordWithToken,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         toast.success(data?.msg);
         reset();
         navigate('/auth/login');
      },
   });

   return {
      mutate,
   };
};
