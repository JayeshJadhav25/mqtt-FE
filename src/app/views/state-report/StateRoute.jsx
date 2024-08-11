import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const StateReport = Loadable(lazy(() => import('./main')));

const stateReportRoutes = [{ path: '/report/state', element: <StateReport /> }];

export default stateReportRoutes;
