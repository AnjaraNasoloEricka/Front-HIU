import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import programsRouter from 'app/views/programs/ProgramsRouter';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import ExamsRouter from './views/exams/ExamsRouter';
import todoRouter from 'app/views/todo/TodoRoutes';
import PublicationsRouter from './views/publications/PublicationsRouter';
import CommentairesRouter from './views/commentaires/CommentairesRouter';
import suggestionRoutes from './views/suggestion/SuggestionRoutes';
import QuizRouter from './views/quiz/QuizRouter';
import memorygameRouter from './views/memorygame/MemoryGameRoute';
import LessonsRouter from './views/lessons/LessonsRouter';
import cloudRouter from './views/cloud/CloudRouter';

const routes = [
  {
    element: (
      // <AuthGuard>
        <MatxLayout />
      // </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes,...programsRouter,...ExamsRouter,...todoRouter, ...PublicationsRouter, ...CommentairesRouter, ...suggestionRoutes,...QuizRouter,...memorygameRouter, ...LessonsRouter,...cloudRouter],
    // children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes,...programsRouter,...ExamsRouter,...todoRouter,...suggestionRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="/program" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
