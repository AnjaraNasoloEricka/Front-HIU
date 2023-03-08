import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Quiz = Loadable(lazy(() => import('./Quiz')));

const QuizRouter = [
  { path: '/quiz', element: <Quiz />, auth: authRoles.admin },
];

export default QuizRouter;