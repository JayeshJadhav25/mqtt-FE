import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const Users = Loadable(lazy(() => import('./main')));

const userRoutes = [
    { path: '/users', element: <Users /> },

];

export default userRoutes;
