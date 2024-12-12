import { login } from '@/api/AuthAPI';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogin = () => {
   const navigate = useNavigate();
   const { mutate } = useMutation({
      mutationFn: login,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         navigate('/');
      },
   });

   return { mutate };
};
