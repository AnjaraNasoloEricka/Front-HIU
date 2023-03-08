import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Commentaires = Loadable(lazy(() => import('./Commentaires')));

const CommentairesRouter = [
  { path: '/commentaires', element: <Commentaires />, auth: authRoles.admin },
];

export default CommentairesRouter;