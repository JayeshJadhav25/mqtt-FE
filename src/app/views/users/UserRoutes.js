import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Users = Loadable(lazy(() => import('./Users')));

const userRoutes = [
    { path: '/users', element: <Users /> },
  
  ];
  
export default userRoutes;
