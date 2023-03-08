import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MemoryGame = Loadable(lazy(() => import('./MemoryGame')));

const memorygameRouter = [
  { path: '/memorygame', element: <MemoryGame />, auth: authRoles.admin },
];

export default memorygameRouter;