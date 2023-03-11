import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const CloudDirectory = Loadable(lazy(() => import('./CloudDirectory')));
const CloudFile = Loadable(lazy(() => import('./CloudFile')));



const cloudRouter = [
  { path: '/cloud', element: <CloudDirectory />, auth: authRoles.admin },
  { path: '/cloud/:documentId/file', element: <CloudFile />, auth: authRoles.admin }
];

export default cloudRouter;