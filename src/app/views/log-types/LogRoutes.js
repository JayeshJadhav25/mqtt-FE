import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Logs = Loadable(lazy(() => import('./Log')));

const userRoutes = [
    { path: '/logtypes', element: <Logs /> },
  
  ];
  
export default userRoutes;
