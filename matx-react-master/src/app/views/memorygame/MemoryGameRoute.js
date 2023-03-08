import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MemoryGame = Loadable(lazy(() => import('./MemoryGame')));
const PuzzleGameBoard = Loadable(lazy(() => import('./PuzzleGameBoard')));


const memorygameRouter = [
  { path: '/memorygame', element: <MemoryGame />, auth: authRoles.admin },
  { path: '/puzzlegame', element: <PuzzleGameBoard />, auth: authRoles.admin }
];

export default memorygameRouter;