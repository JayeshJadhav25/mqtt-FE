import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import userRoutes from 'app/views/users/UserRoutes';
import logRoutes from 'app/views/log-types/LogRoutes';
import deviceConfigRoutes from 'app/views/device-config/DeviceConfigRoutes';
// import deviceRoutes from 'app/views/device/DeviceRoutes';
import loggerRoutes from 'app/views/logger/LoggerRoutes';
import maintenanceRoutes from 'app/views/maintenance/MaintenanceRoutes';
import mainDeviceRoutes from 'app/views/devices/DeviceRoutes';
import stateReportRoutes from 'app/views/state-report/StateRoute';
import doorReportRoutes from './views/door-report/DoorReportRoute';
import auditLogRoutes from './views/audit-log/AuditLogRoutes';
import configRoutes from './views/config/ConfigRoute';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...chartsRoute,
      ...materialRoutes,
      ...userRoutes,
      ...logRoutes,
      ...deviceConfigRoutes,
      // ...deviceRoutes,
      ...loggerRoutes,
      ...maintenanceRoutes,
      ...mainDeviceRoutes,
      ...stateReportRoutes,
      ...doorReportRoutes,
      ...auditLogRoutes,
      ...configRoutes
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
