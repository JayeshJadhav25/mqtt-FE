import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const DeviceConfigs = Loadable(lazy(() => import('./main')));

const userRoutes = [{ path: '/deviceconfig', element: <DeviceConfigs /> }];

export default userRoutes;
