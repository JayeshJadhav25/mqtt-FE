import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const DeviceConfigs = Loadable(lazy(() => import('./main')));

const deviceRoutes = [{ path: '/device', element: <DeviceConfigs /> }];

export default deviceRoutes;
