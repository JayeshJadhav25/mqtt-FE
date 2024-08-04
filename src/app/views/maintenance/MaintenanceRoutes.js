import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Maintenance = Loadable(lazy(() => import('./main')));

const maintenanceRoutes = [{ path: '/maintenance', element: <Maintenance /> }];

export default maintenanceRoutes;
