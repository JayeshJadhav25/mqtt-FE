import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Location = Loadable(lazy(() => import('./main')));

const locationRoutes = [{ path: '/location', element: <Location /> }];

export default locationRoutes;
