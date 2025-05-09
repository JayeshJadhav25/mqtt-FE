
const accessLevel = window.localStorage.getItem('accessLevel');
let accessLevelNavigation = [];

if (accessLevel == 1) {
	accessLevelNavigation = [
		{ name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
		{ name: 'Users', path: '/users', icon: 'account_circle' },
		{
			name: 'Devices',
			icon: 'cloud',
			children: [
				{ name: 'Devices', iconText: 'FP', path: '/devices' },
				{ name: 'Config', iconText: 'FP', path: '/config' },
				{ name: 'Maintenance', iconText: 'FP', path: '/maintenance' },
				{ name: 'Location', iconText: '404', path: '/location' },
			],
		},
		{
			name: 'Reports',
			icon: 'security',
			children: [
				{ name: 'Logger Report', iconText: 'FP', path: '/logger' },
				{ name: 'Door Report', iconText: 'SU', path: '/report/door' },
				{ name: 'State Report', iconText: '404', path: '/report/state' },
				{ name: 'Energy Consumption Report', iconText: '404', path: '/report/energy' },
			],
		},
		{ name: 'Audit Log', path: '/auditlog', icon: 'history' },
	]
}
else if (accessLevel == 2) {
	accessLevelNavigation = [
		{ name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
		{ name: 'Users', path: '/users', icon: 'account_circle' },
		{
			name: 'Devices',
			icon: 'cloud',
			children: [
				{ name: 'Devices', iconText: 'FP', path: '/devices' },
				{ name: 'Maintenance', iconText: 'FP', path: '/maintenance' },
				{ name: 'Location', iconText: '404', path: '/location' },
			],
		},
		{
			name: 'Reports',
			icon: 'security',
			children: [
				{ name: 'Door Report', iconText: 'SU', path: '/report/door' },
				{ name: 'State Report', iconText: '404', path: '/report/state' },
				{ name: 'Energy Consumption Report', iconText: '404', path: '/report/energy' },
			],
		},
		{ name: 'Audit Log', path: '/auditlog', icon: 'history' },
	]
} else if (accessLevel == 3) {
	accessLevelNavigation = [
		{ name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
		{
			name: 'Devices',
			icon: 'cloud',
			children: [
				{ name: 'Devices', iconText: 'FP', path: '/devices' },
				{ name: 'Maintenance', iconText: 'FP', path: '/maintenance' },

			],
		},
		{
			name: 'Reports',
			icon: 'security',
			children: [
				{ name: 'Door Report', iconText: 'SU', path: '/report/door' },
				{ name: 'State Report', iconText: '404', path: '/report/state' },
			],
		},
	]
}
export const navigations = accessLevelNavigation;  // Your navigation array
