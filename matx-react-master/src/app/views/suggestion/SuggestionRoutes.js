import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Suggestion = Loadable(lazy(() => import('./Suggestion')));

const suggestionRoutes = [
  { path: '/suggestion', element: <Suggestion /> },
];

export default suggestionRoutes;
