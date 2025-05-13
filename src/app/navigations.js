const accessLevel = window.localStorage.getItem('accessLevel');
let accessLevelNavigation = [];

if (accessLevel == 1) {
	accessLevelNavigation = [
		{ name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
		{ name: 'Users', path: '/users', icon: 'account_circle' },
		{
			name: 'Devices',
			icon: 'devices',
			children: [
				{ name: 'Devices', icon: 'memory', path: '/devices' },
				{ name: 'Config', icon: 'settings', path: '/config' },
				{ name: 'Maintenance', icon: 'build', path: '/maintenance' },
				{ name: 'Location', icon: 'location_on', path: '/location' },
			],
		},
		{
			name: 'Reports',
			icon: 'bar_chart',
			children: [
				{ name: 'Logger Report', icon: 'list_alt', path: '/logger' },
				{ name: 'Door Report', icon: 'meeting_room', path: '/report/door' },
				{ name: 'State Report', icon: 'toggle_on', path: '/report/state' },
				{ name: 'Energy Consumption Report', icon: 'bolt', path: '/report/energy' },
			],
		},
		{ name: 'Audit Log', path: '/auditlog', icon: 'history' },
	];
} else if (accessLevel == 2) {
	accessLevelNavigation = [
		{ name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
		{ name: 'Users', path: '/users', icon: 'account_circle' },
		{
			name: 'Devices',
			icon: 'devices',
			children: [
				{ name: 'Devices', icon: 'memory', path: '/devices' },
				{ name: 'Maintenance', icon: 'build', path: '/maintenance' },
				{ name: 'Location', icon: 'location_on', path: '/location' },
			],
		},
		{
			name: 'Reports',
			icon: 'bar_chart',
			children: [
				{ name: 'Door Report', icon: 'meeting_room', path: '/report/door' },
				{ name: 'State Report', icon: 'toggle_on', path: '/report/state' },
				{ name: 'Energy Consumption Report', icon: 'bolt', path: '/report/energy' },
			],
		},
		{ name: 'Audit Log', path: '/auditlog', icon: 'history' },
	];
} else if (accessLevel == 3) {
	accessLevelNavigation = [
		{ name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
		{
			name: 'Devices',
			icon: 'devices',
			children: [
				{ name: 'Devices', icon: 'memory', path: '/devices' },
				{ name: 'Maintenance', icon: 'build', path: '/maintenance' },
			],
		},
		{
			name: 'Reports',
			icon: 'bar_chart',
			children: [
				{ name: 'Door Report', icon: 'meeting_room', path: '/report/door' },
				{ name: 'State Report', icon: 'toggle_on', path: '/report/state' },
			],
		},
	];
}

export const navigations = accessLevelNavigation;
