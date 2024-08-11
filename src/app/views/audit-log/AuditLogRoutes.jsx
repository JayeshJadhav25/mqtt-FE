import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const AuditLog = Loadable(lazy(() => import('./main')));

const auditLogRoutes = [{ path: '/auditlog', element: <AuditLog /> }];

export default auditLogRoutes;
