import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Lessons = Loadable(lazy(() => import('./Lessons')));

const LessonsRouter = [
  { path: '/exams/:examId/lessons', element: <Lessons />, auth: authRoles.admin },
];

export default LessonsRouter;