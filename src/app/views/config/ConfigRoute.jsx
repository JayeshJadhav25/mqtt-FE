import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Config = Loadable(lazy(() => import('./main')));

const configRoutes = [{ path: '/config', element: <Config /> }];

export default configRoutes;
