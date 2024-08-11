import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const DoorReport = Loadable(lazy(() => import('./main')));

const doorReportRoutes = [{ path: '/report/door', element: <DoorReport /> }];

export default doorReportRoutes;
