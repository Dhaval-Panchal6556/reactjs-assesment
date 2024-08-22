import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthGuard from '../components/common/AuthGuard';

import { ROUTES } from 'utils/constants/routes';

import ReactQueryDemo from './ReactQueryDemo';
import SignUp from './SignUp';

const Layout = lazy(() => import('../components/layout'));
const SignIn = lazy(() => import('./SignIn'));
const Dashboard = lazy(() => import('./Dashboard'));

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.register} element={<SignUp />} />
      <Route path={ROUTES.signIn} element={<SignIn />} />
      <Route
        path={ROUTES.default}
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index path={ROUTES.dashboard} element={<Dashboard />} />
        <Route path={ROUTES.reactQueryDemo} element={<ReactQueryDemo />} />
        <Route path={ROUTES.default} element={<Navigate replace to={ROUTES.dashboard} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.default} />} />
    </Routes>
  );
};

export default Routing;
