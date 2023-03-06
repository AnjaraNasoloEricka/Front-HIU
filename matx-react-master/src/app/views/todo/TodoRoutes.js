import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Todo = Loadable(lazy(() => import('./Todo')));

const todoRouter = [
  { path: '/todo', element: <Todo />, auth: authRoles.admin },
];

export default todoRouter;