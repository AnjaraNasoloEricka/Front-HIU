import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Badges = Loadable(lazy(() => import('./Badges')));

const badgesRouter = [
  { path: '/badges', element: <Badges />, auth: authRoles.admin },
];

export default badgesRouter;