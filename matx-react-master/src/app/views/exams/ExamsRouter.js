import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Exams = Loadable(lazy(() => import('./Exams')));

const ExamsRouter = [
  { path: '/exams', element: <Exams />, auth: authRoles.admin },
];

export default ExamsRouter;