import { AppLayout, AuthLayout } from '@/layouts';
import {
   ChangePasswordPage,
   ConfirmPage,
   CreateProjectPage,
   EditProjectPage,
   ForgotPasswordPage,
   LoginPage,
   NewCodePage,
   NewPasswordPage,
   NotFound,
   ProfilePage,
   ProjectDetailsPage,
   ProjectTeamPage,
   RegisterPage,
} from '@/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProfileLayout } from './layouts/ProfileLayout';
import { DashboardPage } from './pages/DashboardPage';

export const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route path="/" element={<DashboardPage />} index />
               <Route path="/projects/create" element={<CreateProjectPage />} />
               <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
               <Route path="/projects/:projectId/edit" element={<EditProjectPage />} />
               <Route path="/projects/:projectId/team" element={<ProjectTeamPage />} />
               <Route element={<ProfileLayout />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/password" element={<ChangePasswordPage />} />
               </Route>
            </Route>
            <Route element={<AuthLayout />}>
               <Route path="/auth/login" element={<LoginPage />} />
               <Route path="/auth/register" element={<RegisterPage />} />
               <Route path="/auth/confirm-account" element={<ConfirmPage />} />
               <Route path="/auth/request-code" element={<NewCodePage />} />
               <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
               <Route path="/auth/new-password" element={<NewPasswordPage />} />
            </Route>

            <Route element={<AuthLayout />}>
               <Route path="*" element={<NotFound />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
};
