import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import userRoutes from 'app/views/users/UserRoutes';
import loggerRoutes from 'app/views/logger/LoggerRoutes';
import maintenanceRoutes from 'app/views/maintenance/MaintenanceRoutes';
import mainDeviceRoutes from 'app/views/devices/DeviceRoutes';
import stateReportRoutes from 'app/views/state-report/StateRoute';
import doorReportRoutes from './views/door-report/DoorReportRoute';
import auditLogRoutes from './views/audit-log/AuditLogRoutes';
import configRoutes from './views/config/ConfigRoute';
import energyRoutes from 'app/views/energy-consumption/EnergyRoute';
import locationRoutes from 'app/views/locations/LocationRoutes';

const routes = [
	{
		element: (
			<AuthGuard>
				<MatxLayout />
			</AuthGuard>
		),
		children: [
			...dashboardRoutes,
			...userRoutes,
			// ...deviceRoutes,
			...loggerRoutes,
			...maintenanceRoutes,
			...mainDeviceRoutes,
			...stateReportRoutes,
			...doorReportRoutes,
			...auditLogRoutes,
			...configRoutes,
			...energyRoutes,
			...locationRoutes
		],
	},
	...sessionRoutes,
	{ path: '/', element: <Navigate to="dashboard/default" /> },
	{ path: '*', element: <NotFound /> },
];

export default routes;
