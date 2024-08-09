import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Device = Loadable(lazy(() => import('./main')));

const mainDeviceRoutes = [{ path: '/devices', element: <Device /> }];

export default mainDeviceRoutes;
