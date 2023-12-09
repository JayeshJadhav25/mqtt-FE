import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Logger = Loadable(lazy(() => import('./main')));

const userRoutes = [{ path: '/logger', element: <Logger /> }];

export default userRoutes;
