import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Program = Loadable(lazy(() => import('./Program')));

const programsRouter = [
  { path: '/program', element: <Program />, auth: authRoles.admin },
];

export default programsRouter;