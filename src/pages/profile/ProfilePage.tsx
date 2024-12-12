import { ProfileForm } from '@/components';
import { useAuth } from '@/hooks';

export const ProfilePage = () => {
   const { data, isLoading } = useAuth();

   if (isLoading) return <div>Cargando...</div>;

   if (data) return <ProfileForm data={data} />;
};
