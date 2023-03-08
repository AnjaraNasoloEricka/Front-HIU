import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Publications = Loadable(lazy(() => import('./Publications')));

const PublicationsRouter = [
  { path: '/publications', element: <Publications />, auth: authRoles.admin },
];

export default PublicationsRouter;